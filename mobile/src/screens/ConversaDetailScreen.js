import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { conversaAPI } from '../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ConversaDetailScreen = () => {
  const route = useRoute();
  const { conversaId, interlocutorNome } = route.params;
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);

  useEffect(() => {
    loadMensagens();
  }, []);

  const loadMensagens = async () => {
    try {
      const response = await conversaAPI.getMensagensByConversa(conversaId);
      setMensagens(response.data);
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
      Alert.alert('Erro', 'Não foi possível carregar as mensagens');
    } finally {
      setLoading(false);
    }
  };

  const enviarMensagem = async () => {
    if (!novaMensagem.trim()) {
      Alert.alert('Erro', 'Digite uma mensagem para enviar');
      return;
    }

    try {
      // Preparar dados da mensagem
      // Para esta implementação, vamos usar um ID de usuário falso
      // Na implementação real, isso viria do contexto de autenticação
      const mensagemData = {
        conversa_id: conversaId,
        conteudo: novaMensagem,
        tipo_usuario: 'aluno', // ou 'professor' dependendo do tipo de usuário logado
        // remetente_id: user.id (na implementação real)
      };

      // Na implementação real, substituiríamos esta chamada pela API real
      // const response = await conversaAPI.addMensagemToConversa(conversaId, mensagemData);
      
      // Para demonstração, adicionamos a mensagem localmente
      const novaMensagemObj = {
        id: mensagens.length + 1,
        conteudo: novaMensagem,
        data_envio: new Date().toISOString(),
        remetente_id: 1, // ID do usuário logado (aluno ou professor)
        tipo_usuario: 'aluno', // ou 'professor'
      };
      
      setMensagens([...mensagens, novaMensagemObj]);
      setNovaMensagem('');
      
      // Rolar para a nova mensagem
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      Alert.alert('Erro', 'Não foi possível enviar a mensagem');
    }
  };

  const renderMensagem = ({ item }) => {
    // Determinar se a mensagem é do usuário logado ou do interlocutor
    const isMensagemDoUsuario = item.tipo_usuario === 'aluno'; // ou 'professor' dependendo do contexto
    
    return (
      <View style={[
        styles.mensagemContainer, 
        isMensagemDoUsuario ? styles.mensagemUsuario : styles.mensagemInterlocutor
      ]}>
        <View style={[
          styles.mensagemBubble, 
          isMensagemDoUsuario ? styles.mensagemBubbleUsuario : styles.mensagemBubbleInterlocutor
        ]}>
          <Text style={[
            styles.mensagemTexto, 
            isMensagemDoUsuario ? styles.mensagemTextoUsuario : styles.mensagemTextoInterlocutor
          ]}>
            {item.conteudo}
          </Text>
          <Text style={[
            styles.mensagemHora, 
            isMensagemDoUsuario ? styles.mensagemHoraUsuario : styles.mensagemHoraInterlocutor
          ]}>
            {new Date(item.data_envio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Carregando conversa...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{interlocutorNome}</Text>
          <TouchableOpacity style={styles.callButton}>
            <Icon name="call" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <FlatList
          ref={flatListRef}
          data={mensagens}
          renderItem={renderMensagem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.mensagensList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={novaMensagem}
            onChangeText={setNovaMensagem}
            placeholder="Digite sua mensagem..."
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={enviarMensagem}>
            <Icon name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 15,
    paddingTop: Platform.OS === 'ios' ? 50 : 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  callButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mensagensList: {
    padding: 10,
  },
  mensagemContainer: {
    marginVertical: 5,
  },
  mensagemUsuario: {
    alignItems: 'flex-end',
  },
  mensagemInterlocutor: {
    alignItems: 'flex-start',
  },
  mensagemBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 10,
  },
  mensagemBubbleUsuario: {
    backgroundColor: '#2196F3',
    borderBottomRightRadius: 0,
  },
  mensagemBubbleInterlocutor: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mensagemTexto: {
    fontSize: 16,
  },
  mensagemTextoUsuario: {
    color: '#fff',
  },
  mensagemTextoInterlocutor: {
    color: '#333',
  },
  mensagemHora: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  mensagemHoraUsuario: {
    color: '#bbdefb',
  },
  mensagemHoraInterlocutor: {
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#2196F3',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
    padding: 50,
    fontSize: 16,
    color: '#666',
  },
});

export default ConversaDetailScreen;