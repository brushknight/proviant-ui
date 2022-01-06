import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome";
import RNPickerSelect from "react-native-picker-select";
import {getUserSettings} from "../../../common/redux/selectors";
import {connect} from "react-redux";
import {USER_SETTINGS_SORT_BY, USER_SETTINGS_SORT_BY_LIST} from "../../../common/redux/reducers/userSettings";
import {setShoppingListSorting} from "../../../common/redux/actions/user/userSettings";

const Settings = ({modalShow, onClose, showTags, setShowTags, settings, sortByItems, setSorting}) => {

    let toggleTagsButton = (
        <TouchableOpacity
            style={[styles.button, styles.button_show_tags]}
            onPress={() => {
                setShowTags(true)
            }
            }
        >
            <Icon name={'eye'} size={20} style={styles.button_icon}/>
            <Text style={styles.button_text}>Показать теги</Text>
        </TouchableOpacity>
    )

    if (showTags) {
        toggleTagsButton = (
            <TouchableOpacity
                style={[styles.button, styles.button_hide_tags]}
                onPress={() => {
                    setShowTags(false)
                }
                }
            >
                <Icon name={'eye-slash'} size={20} style={styles.button_icon}/>
                <Text style={styles.button_text}>Скрыть теги</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalShow}
            onRequestClose={() => {
            }}
            onShow={() => {
            }}
        >
            <View style={styles.modal}>

                <View style={styles.header}>
                    <Text style={styles.header_text}>Настройки отображения</Text>
                </View>

                {toggleTagsButton}

                <View style={styles.section_header}>
                    <Text style={styles.section_header_text}>Сортировка</Text>
                </View>

                <View style={styles.sort_container}>
                    <RNPickerSelect
                        placeholder={{
                            label: 'Выберите метод сортировки',
                            value: null,
                            color: 'grey',
                        }}
                        style={styles.sort}
                        onValueChange={(value) => setSorting(value)}
                        items={sortByItems}
                        value={settings.shoppingList.sortBy}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.button, styles.button_close]}
                    onPress={onClose}
                >
                    <Icon name={'close'} size={20} style={styles.button_icon}/>
                    <Text style={styles.button_text}>Обратно к списку</Text>
                </TouchableOpacity>
            </View>

        </Modal>
    )
}

Settings.propTypes = {
    modalShow: PropTypes.bool,
    onClose: PropTypes.func,
    showTags: PropTypes.bool,
    setShowTags: PropTypes.func

}

const styles = StyleSheet.create({
    header: {
        height: 40
    },
    header_text: {
        height: 40,
        lineHeight: 40,
        fontSize: 20
    },
    section_header: {
        height: 40
    },
    section_header_text: {
        height: 40,
        lineHeight: 40,
        fontSize: 18
    },
    sort_container: {
        height: 60
    },
    button: {
        height: 40,
        borderRadius: 15,
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingRight: 15,
        paddingLeft: 10,
        marginBottom: 10
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
    button_hide_tags: {
        backgroundColor: 'orange'
    },
    button_show_tags: {
        backgroundColor: 'green'
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


const mapStateToProps = (state, ownProps) => {
    const settings = getUserSettings(state)

    console.log(settings.shoppingList.sortBy)

    return {
        settings: settings,
        sortByItems: USER_SETTINGS_SORT_BY_LIST
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const locale = 'en'
    return {
        setSorting: (sortBy) => dispatch(setShoppingListSorting(sortBy))
    }
}

Settings.propTypes = {
    settings: PropTypes.object,
    sortByItems: PropTypes.object,
    modalShow: PropTypes.bool,
    setSorting: PropTypes.func,
    onClose: PropTypes.func,
    showTags: PropTypes.bool,
    setShowTags: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

