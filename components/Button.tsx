
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/commonStyles';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger' | 'ghost';

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  variant?: ButtonVariant;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  rightIconName?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  accessibilityLabel?: string;
}

export default function Button({
  text,
  onPress,
  style,
  textStyle,
  variant = 'primary',
  leftIconName,
  rightIconName,
  disabled,
  accessibilityLabel,
}: ButtonProps) {
  const { containerStyle, labelStyle, iconColor } = getStylesForVariant(variant, disabled);

  return (
    <TouchableOpacity
      style={[styles.baseButton, containerStyle, style]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!!disabled}
      accessibilityLabel={accessibilityLabel || text}
      accessibilityRole="button"
    >
      <View style={styles.contentRow}>
        {leftIconName ? (
          <Ionicons name={leftIconName} size={18} color={iconColor} style={{ marginRight: 8 }} />
        ) : null}
        <Text style={[styles.baseText, labelStyle, textStyle]}>{text}</Text>
        {rightIconName ? (
          <Ionicons name={rightIconName} size={18} color={iconColor} style={{ marginLeft: 8 }} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

function getStylesForVariant(variant: ButtonVariant, disabled?: boolean) {
  const disabledStyle: ViewStyle = disabled ? { opacity: 0.6 } : {};

  switch (variant) {
    case 'primary':
      return {
        containerStyle: {
          backgroundColor: colors.secondary,
          borderWidth: 0,
          boxShadow: '0px 2px 5px rgba(0,0,0,0.35)',
          elevation: 4,
          ...disabledStyle,
        },
        labelStyle: { color: '#fff' },
        iconColor: '#fff',
      };
    case 'success':
      return {
        containerStyle: {
          backgroundColor: colors.success,
          borderWidth: 0,
          boxShadow: '0px 2px 5px rgba(0,0,0,0.35)',
          elevation: 4,
          ...disabledStyle,
        },
        labelStyle: { color: '#fff' },
        iconColor: '#fff',
      };
    case 'warning':
      return {
        containerStyle: {
          backgroundColor: colors.warning,
          borderWidth: 0,
          boxShadow: '0px 2px 5px rgba(0,0,0,0.35)',
          elevation: 4,
          ...disabledStyle,
        },
        labelStyle: { color: '#fff' },
        iconColor: '#fff',
      };
    case 'danger':
      return {
        containerStyle: {
          backgroundColor: colors.danger,
          borderWidth: 0,
          boxShadow: '0px 2px 5px rgba(0,0,0,0.35)',
          elevation: 4,
          ...disabledStyle,
        },
        labelStyle: { color: '#fff' },
        iconColor: '#fff',
      };
    case 'outline':
      return {
        containerStyle: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.accent,
          ...disabledStyle,
        },
        labelStyle: { color: colors.accent },
        iconColor: colors.accent,
      };
    case 'ghost':
      return {
        containerStyle: {
          backgroundColor: 'transparent',
          borderWidth: 0,
          ...disabledStyle,
        },
        labelStyle: { color: colors.text },
        iconColor: colors.text,
      };
    case 'secondary':
    default:
      return {
        containerStyle: {
          backgroundColor: colors.primary,
          borderWidth: 0,
          boxShadow: '0px 2px 5px rgba(0,0,0,0.35)',
          elevation: 4,
          ...disabledStyle,
        },
        labelStyle: { color: '#fff' },
        iconColor: '#fff',
      };
  }
}

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto_700Bold',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
