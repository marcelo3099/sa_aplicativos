import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  Picker,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('aluno'); // 'aluno' ou 'professor'
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [altura, setAltura] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [especializacao, setEspecializacao] = useState('');
  const [cref, setCref] = useState('');
  const [descricao, setDescricao] = useState('');
  const [experienciaAnos, setExperienciaAnos] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigation = useNavigation();

  const handleRegister = async () => {
    // Validação de entrada
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha nome, email e senha');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, forneça um email válido');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      // Preparar dados para registro
      const userData = {
        name,
        email,
        password,
        user_type: userType,
        telefone,
      };

      // Adicionar campos específicos para aluno ou professor
      if (userType === 'aluno') {
        userData.data_nascimento = dataNascimento;
        userData.altura = parseFloat(altura) || null;
        userData.objetivo = objetivo;
      } else {
        userData.especializacao = especializacao;
        userData.cref = cref;
        userData.descricao = descricao;
        userData.experiencia_anos = parseInt(experienciaAnos) || null;
      }

      const result = await register(userData);
      
      if (result.success) {
        Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro', result.error);
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  const toggleUserType = () => {
    setUserType(userType === 'aluno' ? 'professor' : 'aluno');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>FikiFit</Text>
          <Text style={styles.subtitle}>Registro</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tipo de Usuário</Text>
            <View style={styles.pickerContainer}>
              <TouchableOpacity 
                style={[styles.pickerOption, userType === 'aluno' && styles.selectedPickerOption]}
                onPress={() => setUserType('aluno')}
              >
                <Text style={[styles.pickerText, userType === 'aluno' && styles.selectedPickerText]}>Aluno</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.pickerOption, userType === 'professor' && styles.selectedPickerOption]}
                onPress={() => setUserType('professor')}
              >
                <Text style={[styles.pickerText, userType === 'professor' && styles.selectedPickerText]}>Personal</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Digite seu nome"
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Digite sua senha"
              placeholderTextColor="#888"
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              value={telefone}
              onChangeText={setTelefone}
              placeholder="Digite seu telefone"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
            />
          </View>

          {userType === 'aluno' ? (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Data de Nascimento</Text>
                <TextInput
                  style={styles.input}
                  value={dataNascimento}
                  onChangeText={setDataNascimento}
                  placeholder="AAAA-MM-DD"
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Altura (m)</Text>
                <TextInput
                  style={styles.input}
                  value={altura}
                  onChangeText={setAltura}
                  placeholder="Ex: 1.75"
                  placeholderTextColor="#888"
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Objetivo</Text>
                <TextInput
                  style={styles.input}
                  value={objetivo}
                  onChangeText={setObjetivo}
                  placeholder="Ex: Ganho de massa muscular"
                  placeholderTextColor="#888"
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Especialização</Text>
                <TextInput
                  style={styles.input}
                  value={especializacao}
                  onChangeText={setEspecializacao}
                  placeholder="Ex: Musculação"
                  placeholderTextColor="#888"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>CREF</Text>
                <TextInput
                  style={styles.input}
                  value={cref}
                  onChangeText={setCref}
                  placeholder="Número do CREF"
                  placeholderTextColor="#888"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput
                  style={styles.input}
                  value={descricao}
                  onChangeText={setDescricao}
                  placeholder="Fale sobre você"
                  placeholderTextColor="#888"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Anos de Experiência</Text>
                <TextInput
                  style={styles.input}
                  value={experienciaAnos}
                  onChangeText={setExperienciaAnos}
                  placeholder="Ex: 5"
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                />
              </View>
            </>
          )}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Registrando...' : 'Registrar'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#bbb',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pickerContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  pickerOption: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  selectedPickerOption: {
    backgroundColor: '#2196F3',
  },
  pickerText: {
    color: '#666',
    fontWeight: '500',
  },
  selectedPickerText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default RegisterScreen;