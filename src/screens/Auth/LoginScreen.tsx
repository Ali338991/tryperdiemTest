import GoogleLogin from '@components/Auth/GoogleLogin';
import PressableOpacity from '@components/PressableOpacity';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, {flex: 1}]}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.showHideBtn}
          onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showHideText}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>

      <Button title="Sign In" onPress={() => Alert.alert('Sign In Pressed')} />
      <PressableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Google Sign In Pressed')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </PressableOpacity>

      <Text style={styles.orText}>OR</Text>

      <GoogleLogin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  showHideBtn: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  showHideText: {
    color: '#1E90FF',
    marginLeft: 10,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#666',
  },
  button: {
    backgroundColor: '#4285F4',
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
