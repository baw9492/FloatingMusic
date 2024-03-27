import {Modal, Pressable, Text, View} from 'react-native';

export default () => {
  return (
    <Modal transparent={true}>
      <View className=" justify-center items-center flex-1">
        <View className="bg-gray-400">
          <Pressable>
            <Text></Text>
          </Pressable>
          <Pressable onPress={() => setShowMenu(false)}>
            <Text>close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
