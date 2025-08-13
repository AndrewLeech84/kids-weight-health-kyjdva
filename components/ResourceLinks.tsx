
import React from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';

const resources = [
  {
    title: 'WHO Growth Standards (Weight-for-age)',
    url: 'https://www.who.int/tools/child-growth-standards/standards/weight-for-age',
  },
  {
    title: 'WHO Feeding Recommendations (0–2 years)',
    url: 'https://www.who.int/news-room/fact-sheets/detail/infant-and-young-child-feeding',
  },
  {
    title: 'RCH Clinical Practice Guidelines: Growth and Nutrition',
    url: 'https://www.rch.org.au/clinicalguide/guideline_index/Weight_and_growth/',
  },
  {
    title: 'RACGP Paediatric Nutrition resources',
    url: 'https://www.racgp.org.au/clinical-resources/clinical-guidelines',
  },
  {
    title: 'Medicare: Allied Health (Care Plan) info',
    url: 'https://www.servicesaustralia.gov.au/medicare-services-allied-health',
  },
];

export default function ResourceLinks() {
  return (
    <View>
      <Text style={styles.header}>Resources and Fact Sheets</Text>
      {resources.map((r) => (
        <TouchableOpacity key={r.url} onPress={() => Linking.openURL(r.url)} activeOpacity={0.7} style={styles.linkRow}>
          <Text style={styles.linkText}>{r.title}</Text>
        </TouchableOpacity>
      ))}
      <Text style={[styles.note]}>
        Note: Links open in your browser. Content may vary by region; follow your local guidelines and formularies.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: colors.accent,
    fontFamily: 'Roboto_700Bold',
    marginBottom: 6,
  },
  linkRow: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#2b3a55',
  },
  linkText: {
    color: '#90CAF9',
    fontFamily: 'Roboto_400Regular',
  },
  note: {
    color: colors.text,
    fontFamily: 'Roboto_400Regular',
    marginTop: 8,
    fontSize: 12,
    opacity: 0.9,
  },
});
