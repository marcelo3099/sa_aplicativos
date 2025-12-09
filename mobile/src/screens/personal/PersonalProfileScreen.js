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

const PersonalProfileScreen = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: user?.name || '',
    telefone: user?.telefone || '',
    especializacao: user?.especializacao || '',
    cref: user?.cref || '',
    descricao: user?.descricao || '',
    experiencia_anos: user?.experiencia_anos?.toString() || '',
  });

  const handleSave = async () => {
    try {
      const result = await updateUser({
        name: editedData.name,
        telefone: editedData.telefone,
        especializacao: editedData.especializacao,
        cref: editedData.cref,
        descricao: editedData.descricao,
        experiencia_anos: parseInt(editedData.experiencia_anos),
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
          <Text style={styles.userType}>Personal Trainer</Text>
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
            <Icon name="work" size={20} color="#666" />
            <Text style={styles.infoLabel}>Especialização</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={editedData.especializacao}
                onChangeText={(text) => setEditedData({...editedData, especializacao: text})}
                placeholder="Especialização"
              />
            ) : (
              <Text style={styles.infoValue}>{user?.especializacao || 'Não informado'}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Icon name="badge" size={20} color="#666" />
            <Text style={styles.infoLabel}>CREF</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={editedData.cref}
                onChangeText={(text) => setEditedData({...editedData, cref: text})}
                placeholder="CREF"
              />
            ) : (
              <Text style={styles.infoValue}>{user?.cref || 'Não informado'}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Icon name="star" size={20} color="#666" />
            <Text style={styles.infoLabel}>Anos de Experiência</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={editedData.experiencia_anos}
                onChangeText={(text) => setEditedData({...editedData, experiencia_anos: text})}
                placeholder="Anos"
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.infoValue}>{user?.experiencia_anos ? `${user.experiencia_anos} anos` : 'Não informado'}</Text>
            )}
          </View>

          <View style={[styles.infoRow, styles.infoRowNoBorder]}>
            <Icon name="description" size={20} color="#666" />
            <Text style={styles.infoLabel}>Descrição</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={editedData.descricao}
                onChangeText={(text) => setEditedData({...editedData, descricao: text})}
                placeholder="Descrição"
              />
            ) : (
              <Text style={styles.infoValue}>{user?.descricao || 'Não informado'}</Text>
            )}
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
                    especializacao: user?.especializacao || '',
                    cref: user?.cref || '',
                    descricao: user?.descricao || '',
                    experiencia_anos: user?.experiencia_anos?.toString() || '',
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
  userType: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
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

export default PersonalProfileScreen;