
import { Text, View, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Button from '../components/Button';
import { commonStyles, buttonStyles, colors } from '../styles/commonStyles';
import Svg, { Circle, Path, Rect, LinearGradient, Defs, Stop } from 'react-native-svg';

function HealthLogo() {
  return (
    <View style={{ alignItems: 'center', marginBottom: 20 }}>
      <Svg width="120" height="120" viewBox="0 0 120 120">
        <Defs>
          <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colors.accent} stopOpacity="1" />
            <Stop offset="100%" stopColor={colors.secondary} stopOpacity="1" />
          </LinearGradient>
          <LinearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colors.success} stopOpacity="1" />
            <Stop offset="100%" stopColor={colors.accent} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        
        {/* Background circle */}
        <Circle cx="60" cy="60" r="55" fill="url(#grad1)" opacity="0.9" />
        
        {/* Medical cross */}
        <Rect x="50" y="30" width="20" height="60" rx="4" fill="white" />
        <Rect x="30" y="50" width="60" height="20" rx="4" fill="white" />
        
        {/* Growth chart lines */}
        <Path 
          d="M 20 85 Q 35 75 50 70 T 80 65 Q 90 63 100 60" 
          stroke="url(#grad2)" 
          strokeWidth="3" 
          fill="none"
          opacity="0.8"
        />
        <Path 
          d="M 20 90 Q 35 82 50 78 T 80 75 Q 90 73 100 70" 
          stroke="url(#grad2)" 
          strokeWidth="2" 
          fill="none"
          opacity="0.6"
        />
        <Path 
          d="M 20 95 Q 35 88 50 85 T 80 82 Q 90 80 100 78" 
          stroke="url(#grad2)" 
          strokeWidth="2" 
          fill="none"
          opacity="0.4"
        />
        
        {/* Data points */}
        <Circle cx="35" cy="77" r="3" fill={colors.warning} />
        <Circle cx="55" cy="72" r="3" fill={colors.success} />
        <Circle cx="75" cy="68" r="3" fill={colors.accent} />
      </Svg>
    </View>
  );
}

export default function MainScreen() {
  return (
    <View style={commonStyles.container}>
      <ScrollView contentContainerStyle={[commonStyles.content, { padding: 20 }]}>
        <HealthLogo />
        
        <Text style={commonStyles.title}>Child Growth Assistant</Text>
        <Text style={commonStyles.text}>
          Assess weight for age (0–24 months) against WHO growth curves. Identify undergrowth or overgrowth,
          review risk factors, and follow intervention guidance with practical resources. This tool supports,
          not replaces, clinical judgement.
        </Text>

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
