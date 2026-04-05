/**
 * Hook for managing appointment no-show timer and arrival tracking
 * Shows countdown to auto-cancellation
 */

import { useEffect, useState } from 'react';
import authenticatedApi from '../api/axiosInstance';

export const useNoShowTimer = (appointment) => {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isNoShowRisk, setIsNoShowRisk] = useState(false);
  const [hasArrived, setHasArrived] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if appointment is at risk of no-show
  useEffect(() => {
    if (!appointment || !appointment.scheduledTime || !appointment.noShowWindowMinutes) {
      return;
    }

    const timer = setInterval(() => {
      const now = new Date();
      const scheduledTime = new Date(appointment.scheduledTime);
      const noShowDeadline = new Date(
        scheduledTime.getTime() + (appointment.noShowWindowMinutes || 30) * 60 * 1000
      );

      // Check if vehicle has arrived
      if (appointment.vehicleArrivalTime) {
        setHasArrived(true);
        setTimeRemaining(null);
        return;
      }

      // Check if we're past the deadline
      if (now > noShowDeadline) {
        setIsNoShowRisk(true);
        setTimeRemaining(0);
        clearInterval(timer);
        return;
      }

      // Calculate time remaining
      const diffMs = noShowDeadline - now;
      const diffMins = Math.floor(diffMs / 60000);
      const diffSecs = Math.floor((diffMs % 60000) / 1000);

      setTimeRemaining({
        minutes: diffMins,
        seconds: diffSecs,
        totalMs: diffMs,
      });

      // Flag as at-risk if less than 5 minutes remaining
      if (diffMins < 5 && diffMins > 0) {
        setIsNoShowRisk(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [appointment]);

  // Mark vehicle arrival
  const markArrival = async () => {
    if (!appointment?._id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await authenticatedApi.patch(
        `/appointments/${appointment._id}/mark-arrival`
      );

      if (response.status === 200) {
        setHasArrived(true);
        setTimeRemaining(null);
        setIsNoShowRisk(false);
        return response.data;
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to mark arrival';
      setError(errorMsg);
      console.error('Mark arrival error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    timeRemaining,
    isNoShowRisk,
    hasArrived,
    isLoading,
    error,
    markArrival,
  };
};

/**
 * Format time remaining for display
 */
export const formatTimeRemaining = (timeRemaining) => {
  if (!timeRemaining) return 'Arrived';

  const { minutes, seconds } = timeRemaining;

  if (minutes === 0) {
    return `${seconds}s remaining`;
  }

  return `${minutes}m ${seconds}s remaining`;
};
