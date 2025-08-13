
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../styles/commonStyles';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  style?: ViewStyle;
}

export default function Checkbox({ label, checked, onToggle, style }: CheckboxProps) {
  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.7} style={[styles.row, style]}>
      <View style={[styles.box, checked ? styles.boxChecked : null]}>
        {checked ? <View style={styles.dot} /> : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.grey,
    marginRight: 10,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    borderColor: colors.accent,
    backgroundColor: '#1e2a3f',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 8,
    backgroundColor: colors.accent,
  },
  label: {
    color: colors.text,
    fontFamily: 'Roboto_400Regular',
    flex: 1,
    flexWrap: 'wrap',
  },
});
