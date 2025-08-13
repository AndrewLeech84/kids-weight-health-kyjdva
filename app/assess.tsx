
import { useMemo, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { router } from 'expo-router';
import { colors, commonStyles, buttonStyles } from '../styles/commonStyles';
import GrowthChart from '../components/GrowthChart';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import { assessWeightForAge, interpolateCurve, CurveSet, boyCurves, girlCurves } from '../utils/growth';
import { riskCategories } from '../data/riskFactors';
import ResourceLinks from '../components/ResourceLinks';

type Sex = 'male' | 'female';

export default function AssessScreen() {
  const [sex, setSex] = useState<Sex>('male');
  const [ageMonthsInput, setAgeMonthsInput] = useState<string>('6');
  const [weightInput, setWeightInput] = useState<string>('7.5');
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);

  const ageMonths = useMemo(() => {
    const v = parseFloat(ageMonthsInput.replace(',', '.'));
    if (isNaN(v)) return 0;
    return Math.max(0, Math.min(24, v));
  }, [ageMonthsInput]);

  const weightKg = useMemo(() => {
    const v = parseFloat(weightInput.replace(',', '.'));
    if (isNaN(v)) return 0;
    return Math.max(0, Math.min(25, v));
  }, [weightInput]);

  const curves: CurveSet = sex === 'male' ? boyCurves : girlCurves;
  const chartData = useMemo(() => {
    return {
      p15: interpolateCurve(curves.p15),
      p50: interpolateCurve(curves.p50),
      p85: interpolateCurve(curves.p85),
    };
  }, [curves]);

  const result = useMemo(() => assessWeightForAge(ageMonths, weightKg, sex), [ageMonths, weightKg, sex]);

  const riskCount = selectedRisks.length;
  const moreThanOneRisk = riskCount > 1;

  const toggleRisk = (key: string) => {
    setSelectedRisks((prev) => {
      if (prev.includes(key)) {
        return prev.filter((k) => k !== key);
      }
      return [...prev, key];
    });
  };

  const nextStepsText = () => {
    if (!weightKg || weightKg <= 0) return '';
    if (result.classification === 'within') {
      if (moreThanOneRisk) {
        return 'Within range. More than 1 risk factor selected — check weight every 3 months and provide supports as needed.';
      }
      return 'Within range. Reassess height and weight in 3 months or sooner if concerns arise.';
    }
    if (result.classification === 'under') {
      return 'Under 15th centile. If repeated at next visit, proceed to intervention.';
    }
    if (result.classification === 'over') {
      return 'Over 85th centile. If repeated at next visit, proceed to intervention.';
    }
    return '';
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <View style={[styles.headerRow]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backButton]}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Weight-for-Age (0–24 mo)</Text>
          <View style={{ width: 70, height: 40, display: 'contents' }} />
        </View>

        <View style={[commonStyles.card]}>
          <Text style={styles.label}>Sex</Text>
          <View style={styles.segment}>
            <TouchableOpacity
              onPress={() => setSex('male')}
              style={[styles.segmentItem, sex === 'male' ? styles.segmentItemActive : null]}
            >
              <Text style={[styles.segmentText, sex === 'male' ? styles.segmentTextActive : null]}>Boy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSex('female')}
              style={[styles.segmentItem, sex === 'female' ? styles.segmentItemActive : null]}
            >
              <Text style={[styles.segmentText, sex === 'female' ? styles.segmentTextActive : null]}>Girl</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.label}>Age (months, 0–24)</Text>
              <TextInput
                keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'numeric'}
                placeholder="e.g. 6"
                placeholderTextColor={colors.grey}
                value={ageMonthsInput}
                onChangeText={setAgeMonthsInput}
                style={styles.input}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'numeric'}
                placeholder="e.g. 7.5"
                placeholderTextColor={colors.grey}
                value={weightInput}
                onChangeText={setWeightInput}
                style={styles.input}
              />
            </View>
          </View>

          <View style={[commonStyles.card, { marginTop: 12 }]}>
            <Text style={[commonStyles.text, { textAlign: 'left', fontSize: 14 }]}>
              Result: <Text style={{ fontWeight: '800', color: result.color }}>{result.label}</Text>
            </Text>
            <Text style={[commonStyles.text, { textAlign: 'left', marginTop: 6, fontSize: 14 }]}>{nextStepsText()}</Text>
          </View>
        </View>

        <View style={[commonStyles.card, { marginTop: 12 }]}>
          <Text style={styles.sectionTitle}>Growth Chart (Weight vs Age)</Text>
          <GrowthChart
            width={Math.min(700, 340 * 2)}
            height={240}
            p15={chartData.p15}
            p50={chartData.p50}
            p85={chartData.p85}
            point={{ x: ageMonths, y: weightKg }}
          />
          <Text style={[commonStyles.text, { fontSize: 12, textAlign: 'left', marginTop: 6 }]}>
            Curves: 15th, 50th, 85th centiles. Your entry plotted as a dot.
          </Text>
        </View>

        <View style={[commonStyles.card, { marginTop: 12 }]}>
          <Text style={styles.sectionTitle}>Risk Factors (bio-psycho-social)</Text>
          {riskCategories.map((cat) => (
            <View key={cat.key} style={{ marginBottom: 12 }}>
              <Text style={[styles.categoryTitle]}>{cat.title}</Text>
              {cat.items.map((item) => (
                <Checkbox
                  key={item.key}
                  label={item.label}
                  checked={selectedRisks.includes(item.key)}
                  onToggle={() => toggleRisk(item.key)}
                  style={{ marginVertical: 6 }}
                />
              ))}
            </View>
          ))}
          <View style={[commonStyles.card, { marginTop: 6 }]}>
            <Text style={[commonStyles.text, { textAlign: 'left', fontSize: 14 }]}>
              Selected risk factors: {riskCount}. {moreThanOneRisk ? 'If >1 risk factor then weight should be checked every 3 months and supports put in place.' : 'Select relevant risks to inform follow-up.'}
            </Text>
          </View>
        </View>

        {result.classification !== 'within' && (
          <View style={[commonStyles.card, { marginTop: 12 }]}>
            <Text style={styles.sectionTitle}>
              Step 3: Intervention — {result.classification === 'under' ? 'Undergrowth' : 'Overgrowth'}
            </Text>

            {result.classification === 'under' ? (
              <>
                <Text style={styles.interventionHeader}>Diet recommendations</Text>
                <Text style={styles.interventionText}>
                  - Optimise energy-dense, nutrient-rich foods; monitor both food and fluid intake.
                </Text>
                <Text style={styles.interventionHeader}>Behavioural strategies</Text>
                <Text style={styles.interventionText}>
                  - Regular meals/snacks; supervised feeding; support feeding skills and positive mealtime environment.
                </Text>
                <Text style={styles.interventionHeader}>Nutritional optimisation</Text>
                <Text style={styles.interventionText}>
                  - Consider paediatric oral nutritional supplements where clinically indicated.
                </Text>
                <Text style={styles.interventionHeader}>Follow-up and referral</Text>
                <Text style={styles.interventionText}>
                  - Continue intervention for 3 months. Consider Medicare care plan eligibility to support allied health referrals. Paediatricians are specialists (not allied health).
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.interventionHeader}>Diet recommendations</Text>
                <Text style={styles.interventionText}>
                  - Limit energy-dense, low-nutrient foods; prioritise balanced intake with fruits/vegetables; mindful beverages.
                </Text>
                <Text style={styles.interventionHeader}>Behavioural strategies</Text>
                <Text style={styles.interventionText}>
                  - Structure meals/snacks; responsive feeding; limit screen-time during meals; caregiver role-modelling.
                </Text>
                <Text style={styles.interventionHeader}>Physical activity</Text>
                <Text style={styles.interventionText}>
                  - Encourage age-appropriate active play daily; avoid prolonged sedentary time.
                </Text>
                <Text style={styles.interventionHeader}>Nutritional optimisation</Text>
                <Text style={styles.interventionText}>
                  - Consider supplementation only when clinically indicated; liaise with dietetics if unsure.
                </Text>
                <Text style={styles.interventionHeader}>Follow-up and referral</Text>
                <Text style={styles.interventionText}>
                  - Continue intervention for 3 months. Consider Medicare care plan eligibility to support allied health referrals. Paediatricians are specialists (not allied health).
                </Text>
              </>
            )}

            <View style={{ marginTop: 10 }}>
              <ResourceLinks />
            </View>
          </View>
        )}

        <View style={{ marginTop: 16 }}>
          <Button
            text="Reset"
            onPress={() => {
              setSex('male');
              setAgeMonthsInput('6');
              setWeightInput('7.5');
              setSelectedRisks([]);
            }}
            style={[buttonStyles.backButton, { backgroundColor: colors.primary }]}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
    elevation: 2,
  },
  backButtonText: {
    color: colors.text,
    fontFamily: 'Roboto_700Bold',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: colors.text,
    fontSize: 18,
    fontFamily: 'Roboto_700Bold',
  },
  label: {
    color: colors.text,
    fontFamily: 'Roboto_700Bold',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 8,
    padding: 10,
    color: colors.text,
    fontFamily: 'Roboto_400Regular',
    backgroundColor: colors.backgroundAlt,
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    overflow: 'hidden',
    marginBottom: 10,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 10,
  },
  segmentItemActive: {
    backgroundColor: colors.secondary,
  },
  segmentText: {
    textAlign: 'center',
    color: colors.text,
    fontFamily: 'Roboto_700Bold',
  },
  segmentTextActive: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Roboto_700Bold',
    marginBottom: 8,
  },
  categoryTitle: {
    color: colors.accent,
    fontFamily: 'Roboto_700Bold',
    marginBottom: 4,
    marginTop: 8,
  },
  interventionHeader: {
    color: colors.accent,
    fontFamily: 'Roboto_700Bold',
    marginTop: 8,
    marginBottom: 4,
  },
  interventionText: {
    color: colors.text,
    fontFamily: 'Roboto_400Regular',
    marginBottom: 4,
    lineHeight: 20,
  },
});
