import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import headerImage from "../assets/title.png";
const Main = () => {
  const [email, onChangeEmail] = React.useState("");
  const [fN, onChangeFN] = React.useState("");
  const [state, setState] = React.useState({
    isLoading: true,
  });

  return (
    <>
      <View
        style={[
          {
            flex: 0.65,
          },
          styles.main,
        ]}
      >
        <Text style={[styles.headerText, { paddingTop: 60 }]}>
          Let us get to know you
        </Text>
        <Text style={[styles.text, { paddingTop: 80 }]}>First Name</Text>
        <TextInput
          style={[styles.input, styles.text]}
          onChangeText={onChangeFN}
          value={fN}
        />
        <Text style={[styles.text]}>Email</Text>
        <TextInput
          style={[styles.input, styles.text]}
          onChangeText={onChangeEmail}
          value={email}
          placeholder=""
        />
      </View>
      <View
        style={[
          {
            flex: 0.35,
          },
          styles.bottom,
        ]}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("Simple Button pressed")}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Onboarding = () => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      <Main />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  image: {},
  text: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 28,
    color: "#374B57",
  },
  container: {
    flex: 1,
  },
  input: {
    height: 50,
    marginHorizontal: 40,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    borderColor: "#374B57",
  },
  headerText: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 24,
    color: "#374B57",
  },
  header: {
    paddingTop: 24,
    backgroundColor: "#DEE3E9",
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "#DEE3E9",
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#CBD2D9",
    minWidth: "10%",
    marginRight: 50,
    width: 125,
    height: 50,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 24,
    textAlign: "center",
    color: "#475B6A",
  },
  main: {
    backgroundColor: "#CBD2D9",
    paddingBottom: 200,
  },
});
export default Onboarding;
