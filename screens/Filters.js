import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={section}
          style={[
            styles.button,
            { backgroundColor: selections[index] ? "#4E625B" : "#EDEFEE" },
          ]}
          onPress={() => {
            onChange(index);
          }}
        >
          <Text
            style={[
              styles.buttonText,
              { color: selections[index] ? "#EDEFEE" : "#4E625B" },
            ]}
          >
            {section}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#EDEFEE",
    minWidth: "10%",

    width: 80,
    height: 50,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    color: "#4E625B",
    fontWeight: "bold",
  },
});
export default Filters;
