import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import {
  createTable,
  filterByQueryAndCategories,
  getMenuItems,
  saveMenuItems,
} from "../controller/database";
import debounce from "lodash.debounce";
import { getSectionListData, useUpdateEffect } from "../controller/utils";
import { Searchbar } from "react-native-paper";
import Filters from "./Filters";
import { useHeaderHeight } from "@react-navigation/elements";
const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const sections = ["starters", "mains", "desserts", "drinks"];
const HomeScreen = ({ navigation }) => {
  const [data, setData] = React.useState([]);
  const [searchBarText, setSearchBarText] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [filterSelections, setFilterSelections] = React.useState(
    sections.map(() => false)
  );
  const [avatar, setAvatar] = React.useState("");
  React.useEffect(() => {
    // let T1 = getMenuItems();
    // console.log(T1);
    //This part is a function for fetching and storing data
    (async () => {
      try {
        await createTable("food");

        let menuItems = await getMenuItems();

        if (!menuItems.length) {
          console.log("!menuItems.length");
          const response = await fetch(API_URL);
          const json = await response.json();
          menuItems = json.menu;

          // Storing into database
          saveMenuItems(menuItems);
        }

        // const sectionListData = getSectionListData(menuItems);
        // // console.log(JSON.stringify(sectionListData));
        // setData(sectionListData);
        // console.log("menuItems", menuItems);
        setData(menuItems);
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        // const sectionListData = getSectionListData(menuItems);
        // setData(sectionListData);
        // console.log("filtered", menuItems);
        setData(menuItems);
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = React.useCallback((q) => {
    setQuery(q);
  }, []);
  const debouncedLookup = React.useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };
  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };
  // console.log(JSON.stringify(data));
  const Item = ({ title, description, price, image }) => {
    return (
      <View>
        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.foodTitleText}>{title}</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.foodText}>
              <Text numberOfLines={2}>{description}</Text>
              <Text style={styles.price}>$ {price}</Text>
            </View>
            <Image
              style={styles.logo}
              source={{
                uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/raw/main/images/${image}`,
              }}
            />
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            borderBottomColor: "#E9E9E9",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <Item
      title={item.name}
      price={item.price}
      description={item.description}
      image={item.image}
    />
  );
  const height = useHeaderHeight();
  // console.log("data", data);
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height - 164}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.searchContainer}
    >
      <View
        style={[
          styles.container,
          {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column",
          },
        ]}
      >
        <View
          style={{ flex: 0.45, backgroundColor: "#495E57", paddingLeft: 25 }}
        >
          <Text style={styles.HeaderText}>Little Lemon</Text>
          <View style={{ flexDirection: "row" }}>
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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Searchbar
              placeholder="Search"
              placeholderTextColor="#4D625B"
              onChangeText={handleSearchChange}
              value={searchBarText}
              style={styles.searchBarStyle}
              iconColor="#4D625B"
              inputStyle={{ color: "#4D625B" }}
              elevation={0}
            />
          </TouchableWithoutFeedback>
        </View>

        <View style={{ flex: 0.2, backgroundColor: "white" }}>
          <Text style={styles.deliveryHeaderText}>ORDER FOR DELIVERY!</Text>
          <Filters
            selections={filterSelections}
            onChange={handleFiltersChange}
            sections={sections}
          />
        </View>
        <View
          style={{
            marginHorizontal: 10,
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={{ flex: 0.35, backgroundColor: "white" }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => {
              return item.id ? item.id : item.name;
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  cards: {
    flex: 1,
  },
  searchBarStyle: {
    // marginVertical: 24,
    backgroundColor: "#EDEFEE",
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 10,
    marginVertical: 10,
    marginRight: 15,
  },
  container: {
    flex: 1,
  },
  titleImage: {
    width: 135,
    height: 135,
    resizeMode: "center",
    marginTop: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  search: {
    marginTop: 20,
    width: 50,
    height: 50,
    resizeMode: "stretch",
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
  deliveryHeaderText: {
    paddingTop: 20,
    paddingHorizontal: 15,
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
  },
  foodTitleText: {
    paddingTop: 20,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  logo: {
    flex: 0.3,
    // resizeMode: "center",
    marginLeft: 20,
    marginBottom: 18,
    height: 100,
    width: 100,
  },
  foodText: {
    paddingTop: 5,
    fontSize: 16,
    color: "#526660",
    flex: 0.7,
  },
  price: {
    color: "#4D625B",
    paddingTop: 12,
    fontSize: 17,
    fontWeight: "bold",
    paddingBottom: 30,
  },
  deliveryPText: {
    color: "back",
    fontSize: 17,
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
  searchContainer: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  inputSearch: {
    height: 40,
    fontSize: 36,
    backgroundColor: "grey",
    color: "white",
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});

export default HomeScreen;
