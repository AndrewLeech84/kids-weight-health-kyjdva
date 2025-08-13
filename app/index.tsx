
import { Text, View, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Button from '../components/Button';
import { commonStyles, buttonStyles, colors } from '../styles/commonStyles';

export default function MainScreen() {
  return (
    <View style={commonStyles.container}>
      <ScrollView contentContainerStyle={[commonStyles.content, { padding: 20 }]}>
        <Image
          source={require('../assets/images/final_quest_240x240.png')}
          style={{ width: 160, height: 160, marginBottom: 16 }}
          resizeMode="contain"
        />
        <Text style={commonStyles.title}>Child Growth Assistant</Text>
        <Text style={commonStyles.text}>
          Assess weight for age (0–24 months) against WHO growth curves. Identify undergrowth or overgrowth,
          review risk factors, and follow intervention guidance with practical resources. This tool supports,
          not replaces, clinical judgement.
        </Text>

        <View style={[commonStyles.card, { marginTop: 12 }]}>
          <Text style={[commonStyles.text, { textAlign: 'left' }]}>
            - Enter age in months and weight in kg
          </Text>
          <Text style={[commonStyles.text, { textAlign: 'left' }]}>
            - View position against 15th, 50th, 85th centiles
          </Text>
          <Text style={[commonStyles.text, { textAlign: 'left' }]}>
            - Select risk factors (bio-psycho-social)
          </Text>
          <Text style={[commonStyles.text, { textAlign: 'left' }]}>
            - Follow prompts for reassessment or interventions
          </Text>
        </View>

        <View style={commonStyles.buttonContainer}>
          <Button
            text="Start Assessment"
            onPress={() => {
              console.log('Navigating to /assess');
              router.push('/assess');
            }}
            style={[buttonStyles.instructionsButton, { backgroundColor: colors.secondary }]}
          />
        </View>

        <View style={[commonStyles.card, { marginTop: 18 }]}>
          <Text style={[commonStyles.text, { textAlign: 'left', fontSize: 12, opacity: 0.85 }]}>
            Disclaimer: This tool uses simplified WHO-based reference percentiles for rapid screening.
            It does not replace clinical judgement or comprehensive assessment. Always consider individual
            context and local guidelines.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
