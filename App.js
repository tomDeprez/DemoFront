import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { useState } from 'react';

const Stack = createStackNavigator();

// Écran d'inscription
function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        email,
        password,
      });
      alert(response.data.message);
      navigation.navigate('Login');
    } catch (error) {
      alert(error.response?.data?.error || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <LinearGradient
      colors={['#FF6F61', '#6B5B95', '#88B04B']}
      style={styles.container}
    >
      <Text style={styles.title}>Create account</Text>
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="email" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create</Text>
        <Icon name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.socialText}>Or create account using social media</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#3b5998' }]} />
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#00acee' }]} />
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#dd4b39' }]} />
      </View>
    </LinearGradient>
  );
}

// Écran de connexion
function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email: username, // On utilise username comme email ici
        password,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.error || 'Erreur lors de la connexion');
    }
  };

  return (
    <LinearGradient
      colors={['#FF6F61', '#6B5B95', '#88B04B']}
      style={styles.container}
    >
      <Text style={styles.title}>Hello</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
        <Icon name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.createAccount}>Don't have an account? Create</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  forgotPassword: {
    color: '#888',
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FF6F61',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  createAccount: {
    color: '#888',
    marginTop: 20,
  },
  socialText: {
    color: '#888',
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
});