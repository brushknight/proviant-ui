import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import {nextMonth, nextWeek, tomorrow} from "../../../common/utils/date";
import {COLOR_SUCCESS, COLOR_WARNING} from "../../const";

const DatetimeModal = ({datetimeModalShow, onClose, dueDate, setDueDate}) => {

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={datetimeModalShow}
            onRequestClose={() => {
            }}
            onShow={() => {
            }}
        >
            <View style={styles.modal}>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dueDate}
                    mode={'date'}
                    is24Hour={true}
                    display="inline"
                    themeVariant="light"
                    onChange={(event, selectedDate) => {
                        setDueDate(selectedDate || dueDate)
                        onClose()
                    }}
                />
                <View style={styles.two_buttons_row}>
                    <TouchableOpacity
                        style={[styles.button, styles.button_today, , styles.button_margin_right]}
                        onPress={() => {
                            setDueDate(new Date())
                            onClose()
                        }}
                    >
                        <Icon name={'calendar'} size={20} style={styles.button_icon}/>
                        <Text style={styles.button_text}>Сегодня</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.button_tomorrow, styles.button_margin_left]}
                        onPress={() => {
                            setDueDate(tomorrow())
                            onClose()
                        }}
                    >
                        <Icon name={'calendar'} size={20} style={styles.button_icon}/>
                        <Text style={styles.button_text}>Завтра</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[styles.button, styles.button_tomorrow]}
                    onPress={() => {
                        setDueDate(nextWeek())
                        onClose()
                    }}
                >
                    <Icon name={'calendar'} size={20} style={styles.button_icon}/>
                    <Text style={styles.button_text}>На следующей неделе</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.button_tomorrow]}
                    onPress={() => {
                        setDueDate(nextMonth())
                        onClose()
                    }}
                >
                    <Icon name={'calendar'} size={20} style={styles.button_icon}/>
                    <Text style={styles.button_text}>В следующем месяце</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.button_close]}
                    onPress={() => {
                        onClose()
                    }}
                >
                    <Icon name={'close'} size={20} style={styles.button_icon}/>
                    <Text style={styles.button_text}>Закрыть</Text>
                </TouchableOpacity>
            </View>

        </Modal>
    )
}

DatetimeModal.propTypes = {
    datetimeModalShow: PropTypes.bool,
    onClose: PropTypes.func,
    dueDate: PropTypes.object,
    setDueDate: PropTypes.func
}

const styles = StyleSheet.create({
    two_buttons_row:{
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button_margin_left:{
        marginLeft: 5
    },
    button_margin_right:{
        marginRight: 5
    },
    button: {
        height: 40,
        borderRadius: 15,
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingRight: 15,
        paddingLeft: 10,
        marginBottom: 10,
        flexGrow: 1
    },
    button_text: {
        color: '#ffffff',
        textAlign: 'center',
        height: 40,
        lineHeight: 40,
        fontSize: 16,
        fontWeight: '500'
    },

    button_icon: {
        color: '#ffffff',
        textAlign: 'center',
        height: 40,
        lineHeight: 40,
        width: 30
    },
    button_today: {
        backgroundColor: COLOR_WARNING
    },
    button_tomorrow: {
        backgroundColor: COLOR_SUCCESS
    },
    button_close: {
        backgroundColor: 'grey'
    },
    modal: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 50
    },
})

export default DatetimeModal
