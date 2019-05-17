import React from 'react'
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types'

let btnColor = '#59b26a'

export default class ConfirmDialog extends React.Component {
  static propTypes = {
    btnTextColor: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    transparent: PropTypes.bool,
    onClickModal: PropTypes.func,
    onClickCancel: PropTypes.func.isRequired,
    onClickConfirm: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func,
    containerStyle: PropTypes.object
  }
  
  static defaultProps = {
    transparent: true,
    containerStyle: {},
    btnColor: btnColor
  }
  
  constructor (props) {
    super(props)
    this.state = {
      onRequestClose: this.props.onRequestClose ? this.props.onRequestClose : this.props.onClickCancel
    }
  }
  
  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.btnColor) {
      btnColor = nextProps.btnColor
    }
  }
  
  render () {
    return (
      <Modal
        visible={this.props.visible}
        onRequestClose={() => this.state.onRequestClose()}
        animationType={'fade'}
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.container, this.props.containerStyle]}>
            {this.props.children}
          </View>
          <View style={styles.modalCancel}>
            <TouchableOpacity onPress={() => this.props.onClickConfirm()} style={[styles.btn, styles.btnBorder]}>
              <View>
                <Text style={styles.modalCancelText}>确&nbsp;&nbsp;&nbsp;&nbsp;定</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onClickCancel()} style={styles.btn}>
              <View>
                <Text style={styles.modalCancelText}>关&nbsp;&nbsp;&nbsp;&nbsp;闭</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '90%',
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 10
  },
  modalCancel: {
    width: '90%',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopWidth: 1,
    borderTopColor: btnColor
  },
  modalCancelText: {
    fontSize: 20
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5
  },
  btnBorder: {
    borderRightWidth: 0.5,
    borderRightColor: '#bfbfbf'
  }
})