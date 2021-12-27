import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import ShoppingListTick from './ShoppingListTick'
import {unixToDate} from "../../../common/utils/date";

const ShoppingListRow = ({item, showTags, onCheck, onUncheck, onClick}) => {
    const goToDetails = () => {
        onClick()
    }

    let tags = []

    if (showTags){
        tags = (
            <View style={styles.tags}>
                <View style={styles.date_tag}><Text>{unixToDate(new Date(item.due_date))}</Text></View>
            </View>
        )
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
