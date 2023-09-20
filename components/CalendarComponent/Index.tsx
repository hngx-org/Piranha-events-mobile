import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { EventData } from "../../static/data";
import { Events } from "../../static/data";

const CalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(
    moment().format("YYYY-MM-DD")
  );
  const [events] = useState<Events[]>(EventData);

  useEffect(() => {
    const markedDates: {
      [date: string]: { marked: boolean; dotColor?: string };
    } = {};

    events.forEach((event) => {
      markedDates[event.date] = {
        marked: true,
        dotColor: "orange",
      };
    });

    if (selectedDate) {
      markedDates[selectedDate] = {
        marked: true,
        dotColor: "orange",
      };
    }

    setMarkedDates(markedDates);
  }, [events, selectedDate]);

  const [markedDates, setMarkedDates] = useState<{
    [date: string]: { marked: boolean; dotColor?: string };
  }>({});

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const formattedSelectedDate = selectedDate
    ? moment(selectedDate).format("dddd, D [of] MMMM, YYYY")
    : "";

  const renderEventsForDate = () => {
    const eventsForSelectedDate = events.filter(
      (event) => event.date === selectedDate
    );

    if (eventsForSelectedDate.length === 0) {
      return (
        <View style={styles.eventDetails}>
          <Text style={styles.detailsTxt}>No events for this date.</Text>
        </View>
      );
    }

    return (
      <View style={styles.eventDetails}>
        {eventsForSelectedDate.map((event, index) => (
          <View key={index}>
            <Text style={styles.detailsTxt}>{event.name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                justifyContent: "space-between",
              }}
            >
              <Text style={[styles.detailsSubTxt]}>{event.location}</Text>
              <Text style={[styles.detailsTxt]}>{event.time}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <>
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        theme={{
          todayTextColor: "orange",
          arrowColor: "black",
          textDayFontWeight: "bold",
          selectedDayTextColor: "orange",
          selectedDayBackgroundColor: "none",
        }}
      />
      <View style={styles.eventView}>
        <View style={styles.dateView}>
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: "red",
              marginRight: 10,
            }}
          />
          <Text style={styles.date}>{formattedSelectedDate}</Text>
        </View>
        {renderEventsForDate()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateView: {
    backgroundColor: "#1B1B1B",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 25,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    bottom: -10,
  },
  date: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  detailsTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  detailsSubTxt: {
    color: "white",
    fontSize: 14,
  },
  txtBck: {
    backgroundColor: "white",
    color: "black",
    fontWeight: "bold",
  },
  eventDetails: {
    padding: 25,
    borderRadius: 20,
    backgroundColor: "#5C3EC8",
  },
  eventView: {
    position: "absolute",
    bottom: -10,
    left: 0,
    right: 0,
    flex: 1,
  },
});

export default CalendarComponent;
