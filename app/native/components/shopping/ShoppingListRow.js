import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import ShoppingListTick from './ShoppingListTick'
import {isOverdue, isToday, isTomorrow, unixToDateHuman} from "../../../common/utils/date";
import {COLOR_DANGER, COLOR_SUCCESS, COLOR_WARNING} from "../../const";

const ShoppingListRow = ({item, showTags, onCheck, onUncheck, onClick}) => {
    const goToDetails = () => {
        onClick()
    }

    let tags = []

    if (showTags) {

        let dateStatus = []
        if (item.due_date > 0){
            let due_date = new Date(item.due_date)

            if (!item.checked) {
                switch (true) {
                    case isToday(due_date):
                        dateStatus.push(styles.due_date_today)
                        break;
                    case isTomorrow(due_date):
                        dateStatus.push(styles.due_date_tomorrow)
                        break;
                    case isOverdue(due_date):
                        dateStatus.push(styles.due_date_over)
                        break;
                }
            }else{
                dateStatus = [styles.tag_checked]
            }

            tags = (
                <View style={styles.tags}>
                    <View style={[styles.date_tag, dateStatus]}><Text>{unixToDateHuman(due_date)}</Text></View>
                </View>
            )
        }
    }

    return (
        <TouchableOpacity style={[styles.container, item.checked ? styles.container_checked : null]}
                          onPress={goToDetails}>
            <View style={styles.title_container}>
                <Text style={[item.checked ? styles.opacity_checked : null]}>{item.title}</Text>
            </View>
            <View style={styles.right_container}>
                <Text style={[styles.quantity, item.checked ? styles.opacity_checked : null]}>{item.quantity}</Text>
                <ShoppingListTick
                    isChecked={item.checked}
                    onUncheck={onUncheck}
                    onCheck={onCheck}
                    extraStyles={styles.tick}
                    size={30}/>
            </View>
            {tags}
        </TouchableOpacity>
    )
}

ShoppingListRow.propTypes = {
    item: PropTypes.object,
    onCheck: PropTypes.func,
    onUncheck: PropTypes.func,
    onClick: PropTypes.func,
    showTags: PropTypes.bool
}

const styles = StyleSheet.create({
    container: {
        minHeight: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        // backgroundColor: 'red',
        padding: 10,
        width: '100%',
        paddingRight: 90,
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title_container: {
        // backgroundColor: 'green'
    },
    right_container: {
        minWidth: 80,
        position: 'absolute',
        height: 30,
        right: 10,
        // paddingTop: 10,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end'
        // backgroundColor: 'orange'
    },
    tags: {
        paddingTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tag_checked:{
        opacity: 0.2
    },
    due_date_today: {
        backgroundColor: COLOR_WARNING
    },
    due_date_tomorrow: {
        backgroundColor: COLOR_SUCCESS
    },
    due_date_over: {
        backgroundColor: COLOR_DANGER
    },
    date_tag: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#d9d9d9',
        borderRadius: 50,
        flex: -1,
    },
    container_checked: {
        borderBottomColor: '#e0e0e0'
    },
    opacity_checked: {
        opacity: 0.2
    },
    title: {},
    quantity: {
        paddingRight: 10,
        textAlign: 'right',
        fontWeight: 'bold',
        // backgroundColor: 'blue',
        width: 40,
        height: 30,
        lineHeight: 30
    },
    tick: {
        // backgroundColor: 'yellow'
    },
    tick_checked: {
        // backgroundColor: 'purple'
    }
})

export default ShoppingListRow
