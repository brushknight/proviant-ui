import { Bounce } from 'react-native-animated-spinkit'
import { connect } from 'react-redux'
import { getShoppingForm, getShoppingList } from '../../../common/redux/selectors'
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { shoppingFormReset, shoppingFormSubmit } from '../../../common/redux/actions/shopping/form'
import {
	STATUS_CREATED,
	STATUS_ERROR,
	STATUS_SENDING,
	STATUS_SUBMITTED,
	STATUS_UPDATED
} from '../../../common/redux/reducers/consts'
import Counter from '../../components/shopping/Counter'
import Deeplink from '../utils/Deeplink'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from 'react'
import StatusIndicator from '../../components/generic/StatusIndicator'
import DateTimePicker from '@react-native-community/datetimepicker';
import DatetimeModal from "../../components/shopping/DatetimeModal";
import {unixToDate, unixToDateHuman} from "../../../common/utils/date";

const ShoppingItemCreate = ({error, reset, status, submit, onClose, shoppingListId, style}) => {
    const [title, setTitle] = useState('')
    const [quantity, setQuantity] = useState('')
    const [submitTime, setSubmitTime] = useState(null)
    const [dueDate, setDueDate] = useState(new Date())
    const [isValid, setIsValid] = useState(false)
    const [datetimeModalShow, setDatetimeModalShow] = useState(false)

    const emptyForm = () => {
        setTitle('')
        setQuantity(1)
        setSubmitTime(+(new Date()))
        //setDueDate(new Date()) // disabled for UI purposes
    }

    useEffect(() => {
        if (status === STATUS_CREATED) {
            emptyForm()
        }

        if (title !== '' && quantity > 0) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [status, title, quantity])

    const onSubmit = () => {
        if (isValid) {
            submit(shoppingListId, {
                title,
                quantity,
                due_date: +dueDate
            })
        }
    }

    let errorJsx = []

    if (status === STATUS_ERROR) {
        errorJsx = (
            <View style={styles.hint_error}>
                <Text>
                    {error}
                </Text>
            </View>
        )
    }

    const productTitleFef = useRef();

    return (
        <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={[style, styles.container]}>

            <Deeplink/>

            <DatetimeModal
                datetimeModalShow={datetimeModalShow}
                dueDate={dueDate}
                setDueDate={setDueDate}
                onClose={() => {
                    setDatetimeModalShow(false)
                    productTitleFef.current.focus();
                }
                }
            />

            <TextInput
                placeholder={'Название продукта'}
                style={styles.title}
                onChangeText={(value) => {
                    setTitle(value)
                    reset()
                }}
                value={title}
                autoFocus={true}
                placeholderTextColor="grey"
                multiline={true}
                ref={productTitleFef}
            />

            <View style={styles.count_and_date}>
                <Counter
                    defaultValue={1}
                    onChange={(value) => {
                        setQuantity(value)
                        if (value !== 1) {
                            reset()
                        }
                    }}
                    resetTime={submitTime}
                />

                <TouchableOpacity
                    style={styles.datetime_status}
                    onPress={() => {
                        setDatetimeModalShow(true)
                    }
                    }
                >
                    <Text style={styles.datetime_status_text}>{unixToDateHuman(dueDate)}</Text>
                </TouchableOpacity>
            </View>


            {errorJsx}
            <View style={styles.button_container}>

                <TouchableOpacity
                    style={[styles.button, styles.button_cancel]}
                    onPress={onClose}
                >
                    <Icon name={'times'} size={20} style={styles.button_icon}/>
                    <Text style={styles.button_text}>Отмена</Text>
                </TouchableOpacity>
                <StatusIndicator
                    style={styles.action_indicator}
                    isActive={status === STATUS_SENDING}
                    isSuccess={status === STATUS_CREATED}
                />
                <TouchableOpacity
                    style={[styles.button, styles.button_create, isValid ? null : styles.disabled]}
                    onPress={onSubmit}
                    activeOpacity={isValid ? 0.2 : 1}
                >
                    <Icon name={'arrow-up'} size={20} style={styles.button_icon}/>
                    <Text style={styles.button_text}>Добавить</Text>
                </TouchableOpacity>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        // minHeight: 150
    },
    title: {
        minHeight: 50,
        fontSize: 20,
        marginTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10
    },
    hint_error: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
        color: '#ff0000'
    },
    count_and_date: {
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    datetime_status: {
        flex: -1,
        width: 150,
        height: 40,
        borderRadius: 20,

        backgroundColor: '#d3d3d3',
    },
    datetime_status_text: {
        textAlign: 'center',
        height: 40,
        lineHeight: 40,
        fontSize: 18
    },
    button_container: {
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    button: {
        height: 30,
        borderRadius: 15,
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingRight: 15,
        paddingLeft: 10
    },
    button_cancel: {
        backgroundColor: 'grey',
        marginRight: 5
    },
    button_create: {
        backgroundColor: 'green'
    },
    button_text: {
        color: '#ffffff',
        textAlign: 'center',
        height: 30,
        lineHeight: 30,
        fontSize: 16,
        fontWeight: '500'
    },
    button_icon: {
        color: '#ffffff',
        textAlign: 'center',
        height: 30,
        lineHeight: 30,
        width: 30
    },
    button_success: {
        backgroundColor: 'green'
    },
    disabled: {
        backgroundColor: 'grey'
    },
    action_indicator: {
        marginLeft: 'auto',
        marginRight: 10
    }
})

const mapStateToProps = (state, ownProps) => {
    const shoppingList = getShoppingList(state)
    const form = getShoppingForm(state)
    const shoppingListId = ownProps.shoppingListId

    return {
        fetchStatus: shoppingList.status,
        fetchError: shoppingList.error,
        status: form.status,
        error: form.error,
        shoppingListId,
        style: ownProps.style
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const locale = 'en'
    return {
        submit: (listId, dto) => dispatch(shoppingFormSubmit(listId, dto, locale)),
        reset: () => dispatch(shoppingFormReset())
    }
}

ShoppingItemCreate.propTypes = {
    onClose: PropTypes.func,
    submit: PropTypes.func,
    reset: PropTypes.func,
    className: PropTypes.string,
    status: PropTypes.string,
    error: PropTypes.string,
    i18n: PropTypes.object,
    shoppingListId: PropTypes.number,
    style: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingItemCreate)
