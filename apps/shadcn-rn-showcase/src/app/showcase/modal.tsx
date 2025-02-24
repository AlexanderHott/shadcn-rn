import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { Modal, StyleSheet, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetBackdrop } from "@/components/ui/bottom-sheet";

const Ctx = createContext<{
  msg?: string;
  setMsg?: Dispatch<SetStateAction<string>>;
}>({ msg: undefined });

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [msg, setMsg] = useState("msg");

  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <SafeAreaView style={styles.centeredView}>
      <Ctx.Provider value={{ msg, setMsg }}>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setMsg((msg) => msg + "!")}
        >
          <Text style={styles.textStyle}>{msg}</Text>
        </Pressable>
        <Modal
          animationType="none"
          statusBarTranslucent
          transparent={true}
          visible={modalVisible}
          presentationStyle="overFullScreen"
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheet
              ref={bottomSheetRef}
              onChange={handleSheetChanges}
              onClose={() => setModalVisible(false)}
              enablePanDownToClose
              backdropComponent={BottomSheetBackdrop}
              snapPoints={["50%"]}
            >
              <BottomSheetView style={styles.contentContainer}>
                <Text>Awesome 🎉</Text>
                <Comp />
              </BottomSheetView>
            </BottomSheet>
          </GestureHandlerRootView>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </Ctx.Provider>
    </SafeAreaView>
  );
};

function Comp() {
  const { msg } = useContext(Ctx);
  return <Text>{msg ?? "default"}</Text>;
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});

export default App;
