import React, { Component, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { checkTimekeepingStyle } from '../../styleSheet/checkTimekeepingStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { format } from 'date-fns';
import axios from 'axios';
import { GET_TIME_WHERE_TIME } from '../../config/urlAPI';
import { showSuccess, showWarning } from '../../message/message';
import { Text, Card } from 'react-native-paper';


export default function CheckTimekeepingScreen() {
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [timekeeping, setTimekeeping] = useState({
    _id: '',
    userId: '',
    address: '',
    imageUser: '',
    start_Time: '',
    end_Time: '',
    total_Work: 0,
  });

  const onDateChange = (date: any, type: any) => {
    // console.log(format(new Date(date), 'yyyy-dd-MM'));
    var dates = format(new Date(date), 'yyyy-dd-MM');
    var message = '';
    axios({
      method: 'get',
      url: GET_TIME_WHERE_TIME('/getTimekeepingWhere/', dates),
      responseType: 'json'
    }).then(function (response) {
      // console.log(response);
      message = response.data.message;
      const checkTime = response.data.obj_timekeeping;
      if (checkTime == null) {
        showWarning(message);
        setTimekeeping({
          _id: '',
          userId: '',
          address: '',
          imageUser: '',
          start_Time: '',
          end_Time: '',
          total_Work: 0,
        })
      } else {
        showSuccess(message);
        setTimekeeping({
          _id: response.data.obj_timekeeping._id,
          userId: response.data.obj_timekeeping.userId,
          address: response.data.obj_timekeeping.address,
          imageUser: response.data.obj_timekeeping.imageUser,
          start_Time: response.data.obj_timekeeping.start_Time,
          end_Time: response.data.obj_timekeeping.end_Time,
          total_Work: response.data.obj_timekeeping.total_Work,
        })
      }
    });
    setSelectedStartDate(dates);
  };

  const startDate = selectedStartDate ? selectedStartDate.toString() : '';

  return (
    <SafeAreaView style={[checkTimekeepingStyle.container]}>
      <View style={checkTimekeepingStyle.CalendarPicker}>
        <CalendarPicker onDateChange={onDateChange} />
      </View>
      <View style={checkTimekeepingStyle.CalendarPickerView}>
        {/* <Text variant="titleSmall">Bạn Đang Xem Công Ngày: {startDate}</Text> */}
        <Card>
          <Card.Content>
            <Text variant="titleMedium" style={[checkTimekeepingStyle.tital]}>Bạn Đang Xem Công Ngày: {startDate}</Text>
            <Text variant="titleSmall" style={[checkTimekeepingStyle.textTital]}>Địa Điểm: {timekeeping.address}</Text>
            <Text variant="titleSmall" style={[checkTimekeepingStyle.textTital]}>Giờ Vào: {timekeeping.start_Time}</Text>
            <Text variant="titleSmall" style={[checkTimekeepingStyle.textTital]}>Giờ Ra: {timekeeping.end_Time}</Text>
            <Text variant="titleSmall" style={[checkTimekeepingStyle.textTital]}>Tổng Công: {timekeeping.total_Work} Công</Text>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}