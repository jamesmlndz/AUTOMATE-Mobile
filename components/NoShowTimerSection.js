/**
 * Example: Integrating No-Show Timer into Appointment Detail Screen
 * This is a reference implementation showing how to use the useNoShowTimer hook
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNoShowTimer, formatTimeRemaining } from '../hooks/useNoShowTimer';

/**
 * Example appointment detail section with no-show timer
 * Add this to your appointment detail/tracking screen
 */
export const NoShowTimerSection = ({ appointment, onArrivalMarked }) => {
  const {
    timeRemaining,
    isNoShowRisk,
    hasArrived,
    isLoading,
    error,
    markArrival,
  } = useNoShowTimer(appointment);

  const handleMarkArrival = async () => {
    if (hasArrived) {
      Alert.alert('Already Arrived', 'Vehicle arrival has already been recorded.');
      return;
    }

    Alert.alert(
      'Mark Vehicle Arrival?',
      'This will prevent the appointment from being auto-cancelled due to no-show.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Mark Arrived',
          onPress: async () => {
            try {
              const result = await markArrival();
              if (result) {
                Alert.alert('Success', 'Vehicle arrival marked successfully');
                onArrivalMarked?.(result);
              }
            } catch (err) {
              Alert.alert('Error', error || 'Failed to mark arrival');
            }
          },
          style: 'default',
        },
      ]
    );
  };

  // Don't show section if appointment is not booked
  if (appointment?.status !== 'Booked') {
    return null;
  }

  return (
    <View style={[
      styles.container,
      isNoShowRisk && styles.riskContainer,
    ]}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons
          name={hasArrived ? 'check-circle' : 'timer'}
          size={24}
          color={hasArrived ? '#10B981' : isNoShowRisk ? '#EF4444' : '#3B82F6'}
        />
        <Text style={[
          styles.title,
          isNoShowRisk && styles.riskTitle,
        ]}>
          {hasArrived ? 'Arrival Confirmed' : 'No-Show Timer'}
        </Text>
      </View>

      {/* Timer Display */}
      {!hasArrived && timeRemaining && (
        <View style={styles.timerBox}>
          <Text style={[
            styles.timeText,
            isNoShowRisk && styles.riskText,
          ]}>
            {formatTimeRemaining(timeRemaining)}
          </Text>
          <Text style={styles.subText}>
            until auto-cancellation
          </Text>
        </View>
      )}

      {/* Arrival Confirmed Display */}
      {hasArrived && (
        <View style={styles.arrivedBox}>
          <Text style={styles.arrivedText}>✓ Vehicle has arrived</Text>
        </View>
      )}

      {/* Action Button */}
      {!hasArrived && (
        <TouchableOpacity
          style={[
            styles.button,
            isLoading && styles.disabledButton,
          ]}
          onPress={handleMarkArrival}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <MaterialIcons name="check" size={18} color="#FFF" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Mark Arrival</Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {/* Error Message */}
      {error && (
        <View style={styles.errorBox}>
          <MaterialIcons name="error-outline" size={16} color="#EF4444" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Info Text */}
      <Text style={styles.infoText}>
        {hasArrived
          ? 'Your arrival has been recorded. Visit us at the scheduled time.'
          : `Please arrive at least 15 minutes before your appointment. 
If you don't arrive within ${appointment?.noShowWindowMinutes || 30} minutes of the scheduled time, 
your appointment will be automatically cancelled.`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor': '#3B82F6',
  },
  riskContainer: {
    backgroundColor: '#FEF2F2',
    borderLeftColor: '#EF4444',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginLeft: 10,
  },
  riskTitle: {
    color: '#DC2626',
  },
  timerBox: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3B82F6',
    fontVariant: ['tabular-nums'],
  },
  riskText: {
    color: '#EF4444',
  },
  subText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  arrivedBox: {
    backgroundColor: '#D1FAE5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  arrivedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },
  infoText: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 18,
    fontFamily: 'Messina-Regular',
  },
});

export default NoShowTimerSection;

/**
 * Usage Example:
 * 
 * In your appointment detail screen or tracking screen:
 * 
 * import { NoShowTimerSection } from './NoShowTimerSection';
 * 
 * function AptDetailScreen() {
 *   const [appointment, setAppointment] = useState(null);
 *   
 *   const handleArrivalMarked = (data) => {
 *     console.log('Arrival marked:', data);
 *     // Refresh appointment data
 *     fetchAppointmentDetails();
 *   };
 *   
 *   return (
 *     <ScrollView>
 *       <NoShowTimerSection 
 *         appointment={appointment}
 *         onArrivalMarked={handleArrivalMarked}
 *       />
 *       {/* Rest of appointment details */}
 *     </ScrollView>
 *   );
 * }
 */
