
import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#162456',
  secondary: '#193cb8',
  accent: '#64B5F6',
  background: '#101824',
  backgroundAlt: '#162133',
  text: '#e3e3e3',
  grey: '#90CAF9',
  card: '#193cb8',
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
    elevation: 3,
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
    elevation: 3,
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10,
    fontFamily: 'Roboto_700Bold',
  },
  text: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 12,
  },
  card: {
    backgroundColor: colors.backgroundAlt,
    borderColor: '#30415f',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: 'white',
  },
});
