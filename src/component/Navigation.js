import React, {Component} from "react";
import "./Header.css";

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuTree: [{
                label: 'Buyer Card',
                path:'/open',
                child: [
                    {label: 'Open Charges', path: '/open'},
                    {label: 'Submitted Charges', path: '/submitted'},
                ]
            }],
            selectedPrimaryMenu:{
                label: 'Buyer Card',
                path:'/open',
                child: [
                    {label: 'Open Charges', path: '/open'},
                    {label: 'Submitted Charges', path: '/submitted'},
                ]
            },
            primary: 'Buyer Card',
            secondary: 'Open Charges'
        }
    }

    componentDidMount() {
        if(this.props.initPath && this.props.initPath === '/submitted'){
            this.setState({
                secondary: 'Submitted Charges'
            })
        }
    }

    selectMenu=(isPrimary=true,menuLabel,path)=>{
        if(isPrimary){
            this.setState({
                primary:menuLabel
            },()=>{
                this.props.push(path)
            })
        }else{
            this.setState({
                secondary:menuLabel
            },()=>{
                this.props.push(path)
            })
        }

    }
    render() {
        return (
            <section>
                <div className="navBackground"></div>
                <PrimaryNav menu={this.state.primary} menuTree={this.state.menuTree} selectMenu={this.selectMenu}/>
                <SecondaryNav menu={this.state.secondary} subMenus={this.state.selectedPrimaryMenu.child} selectMenu={this.selectMenu}/>
            </section>
        )
    }
}

function PrimaryNav(props) {
    return (
        <nav className="primary">
            <ul>
                <li>
                    <button type="button" className="linkButton" onClick = {()=>{
                        window.location.href = window.global['COUPA_HOME'];
                    }} id="home">Home</button>
                </li>
                {props.menuTree.map((menu,i)=>{
                    return <li key={'menu'+i} className={props.menu === menu.label ? "on":""}>
                        <button type="button" className="linkButton " onClick={()=>{props.selectMenu(true,menu.label,menu.path)}} >{menu.label}</button>
                    </li>
                })}
            </ul>
        </nav>
    )
}

function SecondaryNav (props) {
    return (
        <nav id="secondary">
            <ul>
                {props.subMenus.map((menu,i)=>{
                    return <li key={'submenu'+i} className={props.menu === menu.label ? "linkButton on":"linkButton"}>
                        <button type="button" className={props.menu === menu.label ? "linkButton activeTab":"linkButton"}
                                onClick={()=>{props.selectMenu(false,menu.label,menu.path)}} >{menu.label}</button>
                    </li>
                })}
            </ul>
        </nav>
    )
}

export default Navigation;