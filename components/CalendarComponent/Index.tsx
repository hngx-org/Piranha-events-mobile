import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { colors } from "../../utils/styles";
import { EventContextType } from "../../contexts/EventContext";
import useEventContext from "../../hooks/useEventContext";

const CalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(
    moment().format("YYYY-MM-DD")
  );

  const { eventState, eventDispatch } = useEventContext() as EventContextType;

  const [markedDates, setMarkedDates] = useState<{
    [date: string]: { marked: boolean; dotColor?: string };
  }>({});

  useEffect(() => {
    if (eventState.events && eventState.events.length > 0) {
      const markedDate: {
        [date: string]: { marked: boolean; dotColor?: string };
      } = {};

      eventState.events.forEach((event) => {
        const eventDate = moment(event.start_time).format("YYYY-MM-DD");
        markedDate[eventDate] = {
          marked: true,
          dotColor: colors.purple,
        };
      });
      setMarkedDates(markedDate);
    } else {
      console.log("No Dates:", "none at all");
    }
  }, [eventState.events]);

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const formattedSelectedDate = selectedDate
    ? moment(selectedDate).format("dddd, D [of] MMMM, YYYY")
    : "";

  const renderEventsForDate = () => {
    if (!Array.isArray(eventState.events)) {
      return (
        <View style={styles.eventDetails}>
          <Text style={styles.detailsTxt}>No events for this date.</Text>
        </View>
      );
    }

    const eventsForSelectedDate = eventState.events.filter(
      (event) => moment(event.start_time).format("YYYY-MM-DD") === selectedDate
    );

    if (eventsForSelectedDate.length === 0) {
      return (
        <View style={styles.eventDetails}>
          <Text style={styles.detailsTxt}>No events for this date.</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.eventDetails}>
        {eventsForSelectedDate.map((event, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={styles.detailsTxt}>{event.title}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                justifyContent: "space-between",
              }}
            >
              <Text style={[styles.detailsSubTxt]}>{event.location}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={[styles.detailsTxt]}>
                  {moment(event.start_time).format("HH:mm a")}
                </Text>
                <Text style={styles.detailsTxt}>-</Text>
                <Text style={[styles.detailsTxt]}>
                  {moment(event.end_time).format("HH:mm a")}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <>
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        theme={{
          todayTextColor: "#FF3A3A",
          arrowColor: colors.purple,
          textDayFontWeight: "bold",
          selectedDayTextColor: colors.purple,
          selectedDayBackgroundColor: colors.purple,
          dayTextColor: "#F2EFEA",
          monthTextColor: "#F2EFEA",
          arrowWidth: 2,
          calendarBackground: colors.dark,
          textDayFontSize: 12,
          textDisabledColor: "#979797",
          textMonthFontSize: 16,
          weekVerticalMargin: 5,
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
    padding: 20,
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
    paddingBottom: 55,
    borderRadius: 20,
    backgroundColor: "#5C3EC8",
    maxHeight: 200,
  },
  eventView: {
    position: "absolute",
    bottom: -40,
    left: 0,
    right: 0,
    flex: 1,
  },
});

export default CalendarComponent;
