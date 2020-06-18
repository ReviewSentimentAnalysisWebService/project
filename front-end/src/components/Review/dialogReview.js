import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Highlighter from "react-highlight-words";
import { connect } from 'react-redux';
//import productStore from 'store/modules/productStore';
function AlertDialog(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const cutString = (text, length) => {
        if (length > 30) {
            return text.substring(0, 30) + "....."
        }
        else {
            return text
        }
    }

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>
                {cutString(props.data, props.data.length)}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle style={{ cursor: 'move' }} id="alert-dialog-title">{"Full review"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Highlighter
                            searchWords={[props.CurrentKeyword, props.SearchTextField, props.SearchSentiField]}
                            autoEscape={true}
                            textToHighlight={props.data}>
                        </Highlighter>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Ok
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = ({ productStore }) => ({  //2
    CurrentKeyword: productStore.CurrentKeyword,
    SearchTextField: productStore.SearchTextField,
    SearchSentiField: productStore.SearchSentiField,
});
//import store name이 맞는거다

//props로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({

});

export default connect( // 스토어와 연결
    mapStateToProps,
    mapDispatchToProps,
)(AlertDialog);