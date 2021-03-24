import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import Button from '@material-ui/core/Button'

import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import CardMedia from '@material-ui/core/CardMedia'

import MessagesList from '../MessagesList';




export default class Chat extends React.Component {

	constructor(props) {
		super(props);
        this.state = {newMsgTxt: ""}
    }






    changeCurrent = conv => {
        this.props.changeConv(conv)
        // let self = this
        // setTimeout(_ => self.scrollToMyRef(), 300)
    }



	render() {

        const Styles = {
            mainContainer: {
                width: "calc(100vw - 20px)",
                height: "calc(100vh - 20px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 0

            },
            asideContainer: {
                height: "10%",
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: 0,
                maxWidth: "1200px",
            },
            members: {
                display: "flex",
                flexDirection: "row",
                flexGrow: "1",
                overflowX: 'scroll'
            },
            msgImg: {
                height: "100%",
                width: "100%"
            },
            msgList: {
                maxWidth: "1200px",
                height: "75%",
                margin: "auto",
                width: "100%",
                padding: 0,
                overflowY: "scroll"
            },
            msg: {
                width: "75%",
            },
            msgRight: {
                float: "right",
                textAlign: "right",
            },
            msgLeft: {
                display: "flex",
            },
            msgContent: {
                display: 'flex',
                flexDirection: 'column'
            },
            msgMoreData: {
                opacity: "0.7",
                fontSize: '0.8em'
            },
            msgDate: {
            },
            msgMemberName: {
                whiteSpace: "nowrap",
                margin: "15px",
                fontSize: 20
            },
            msgInitial: {
                width: "40px",
                minWidth: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid black",
                textTransform: "uppercase",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden"
            },
            msgInitialActive: {
                width: "40px",
                minWidth: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "4px outset #F40057",
                textTransform: "uppercase",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden"
            },
            msgBuffer: {
                margin: "15px"
            },
            newMsgContent: {
                marginRight: "15px",
                flexGrow: "1"
            },
            newMsgBtn: {
                height: "60px"
            },
            logoutBtn: {
                height: "50px",
                marginLeft: "25px"
            },
            logoutIcon: {
                marginLeft: "5px"
            }
        };

       

       


        const Member = (id, mb) => mb.id === this.props.current ? (
            <ListItem key={ id } style={Styles.member} onClick={ _ => this.changeCurrent(mb.id) }>
                <Box component="div" style={Styles.msgInitialActive} >
                    <CardMedia style={Styles.msgImg} image={mb.pic}></CardMedia>
                </Box>
                <Box component="span" style={Styles.msgMemberName}>{ mb.name }</Box>
            </ListItem>
        ) : 
          <ListItem key={ id } style={Styles.member} onClick={ _ => this.changeCurrent(mb.id) }>
                <Box component="div" style={Styles.msgInitial} >
                    <CardMedia style={Styles.msgImg} image={mb.pic}></CardMedia>
                </Box>
                <Box component="span" style={Styles.msgMemberName}>{ mb.name }</Box>
            </ListItem>
            
        const Members = [];
        for (let i = 0, j = this.props.members.length; i < j; i++) {
            Members.push(Member(i, this.props.members[i]))
        }

        return (
            <Container style={Styles.mainContainer} >
                <Container style={{...Styles.asideContainer, ...Styles.header}}>
                    <List style={Styles.members}>
                        { Members }
                    </List>
                    <Button style={Styles.logoutBtn} onClick={_ => this.props.logout()} variant="contained" color="secondary">
                        Log-out<ExitToAppIcon fontSize="small" style={Styles.logoutIcon} />
                    </Button>
                </Container>
                <MessagesList robotId={this.props.current} member={this.props.member} canWrite={this.props.canWrite}/>
            </Container>
        );
    }
}