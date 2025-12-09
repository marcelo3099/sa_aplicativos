import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AlunoProfileScreen = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: user?.name || '',
    telefone: user?.telefone || '',
    data_nascimento: user?.data_nascimento || '',
    altura: user?.altura?.toString() || '',
    objetivo: user?.objetivo || '',
  });

  const handleSave = async () => {
    try {
      const result = await updateUser({
        name: editedData.name,
        telefone: editedData.telefone,
        data_nascimento: editedData.data_nascimento,
        altura: parseFloat(editedData.altura),
        objetivo: editedData.objetivo,
      });

      if (result.success) {
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        setIsEditing(false);
      } else {
        Alert.alert('Erro', result.error);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Icon name="person" size={80} color="#2196F3" style={styles.avatar} />
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.infoRow}>
            <Icon name="phone" size={20} color="#666" />
            <Text style={styles.infoLabel}>Telefone</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={editedData.telefone}
                onChangeText={(text) => setEditedData({...editedData, telefone: text})}
                placeholder="Telefone"
              />
            ) : (
              <Text style={styles.infoValue}>{user?.telefone || 'Não informado'}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Icon name="cake" size={20} color="#666" />
            <Text style={styles.infoLabel}>Nascimento</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={editedData.data_nascimento}
                onChangeText={(text) => setEditedData({...editedData, data_nascimento: text})}
                placeholder="AAAA-MM-DD"
              />
            ) : (
              <Text style={styles.infoValue}>{user?.data_nascimento || 'Não informado'}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Icon name="height" size={20} color="#666" />
            <Text style={styles.infoLabel}>Altura</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={editedData.altura}
                onChangeText={(text) => setEditedData({...editedData, altura: text})}
                placeholder="Altura (m)"
                keyboardType="decimal-pad"
              />
            ) : (
              <Text style={styles.infoValue}>{user?.altura ? `${user.altura}m` : 'Não informado'}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Icon name="flag" size={20} color="#666" />
            <Text style={styles.infoLabel}>Objetivo</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={editedData.objetivo}
                onChangeText={(text) => setEditedData({...editedData, objetivo: text})}
                placeholder="Objetivo"
              />
            ) : (
              <Text style={styles.infoValue}>{user?.objetivo || 'Não informado'}</Text>
            )}
          </View>

          <View style={[styles.infoRow, styles.infoRowNoBorder]}>
            <Icon name="work" size={20} color="#666" />
            <Text style={styles.infoLabel}>Tipo</Text>
            <Text style={styles.infoValue}>Aluno</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setIsEditing(false);
                  setEditedData({
                    name: user?.name || '',
                    telefone: user?.telefone || '',
                    data_nascimento: user?.data_nascimento || '',
                    altura: user?.altura?.toString() || '',
                    objetivo: user?.objetivo || '',
                  });
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Icon name="edit" size={20} color="#fff" />
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
          )}
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
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  profileInfo: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoRowNoBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0,
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
  },
  infoInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    flex: 0.48,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 10,
    flex: 0.48,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default AlunoProfileScreen;