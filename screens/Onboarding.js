import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
// import headerImage from "../assets/title.png";
const Main = ({ navigation }) => {
  const [contactEmail, onChangeContactEmail] = React.useState("");
  const [name, onChangeName] = React.useState("");
  const [state, setState] = React.useState({
    isLoading: true,
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View style={[styles.main]}>
            <View
              style={{
                // flex: 0.48,
                backgroundColor: "#495E57",
                paddingLeft: 25,
              }}
            >
              <Text style={styles.HeaderText}>Little Lemon</Text>
              <View style={{ flexDirection: "row", paddingVertical: 30 }}>
                <View>
                  <Text style={styles.topTextHeader}>Chicago</Text>
                  <Text style={styles.topTextP}>
                    We are a family owned{"\n"}
                    Mediterranean restaurant,{"\n"}
                    focused on traditional{"\n"}
                    recipes served with a{"\n"}
                    modern twist.
                  </Text>
                </View>

                <Image
                  style={styles.titleImage}
                  source={require("../assets/handle.jpg")}
                />
              </View>
            </View>
            <Text style={[styles.text, { paddingTop: 10 }]}>Name *</Text>
            <TextInput
              style={[styles.input, styles.text]}
              onChangeText={onChangeName}
              value={name}
            />

            <Text style={[styles.text]}>Email *</Text>
            <TextInput
              style={[styles.input, styles.text]}
              onChangeText={onChangeContactEmail}
              value={contactEmail}
              placeholder=""
            />
          </View>
          <View
            style={[
              {
                flex: 1,
              },
              styles.bottom,
            ]}
          >
            {name !== "" && contactEmail !== "" && (
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("Profile", {
                    name: name,
                    contactEmail: contactEmail,
                  })
                }
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const Onboarding = ({ navigation }) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      <Main navigation={navigation} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  image: {},
  titleImage: {
    width: 135,
    height: 135,
    resizeMode: "center",
    marginTop: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  HeaderText: {
    color: "#EFCB15",
    fontSize: 45,
    paddingTop: 8,
    fontFamily: "serif",
  },
  topTextHeader: {
    fontFamily: "serif",
    color: "white",
    fontSize: 30,
    paddingBottom: 20,
  },
  topText: {
    color: "white",
    fontSize: 20,
  },
  topTextP: {
    color: "white",
    fontSize: 17,
  },
  text: {
    textAlign: "left",
    marginBottom: 24,
    fontSize: 28,
    color: "#374B57",
    paddingLeft: 25,
  },
  container: {
    flex: 1,
  },
  input: {
    height: 50,
    marginHorizontal: 25,
    borderWidth: 2,
    // padding: 10,   #here
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
    paddingBottom: 20,
  },
});
export default Onboarding;
