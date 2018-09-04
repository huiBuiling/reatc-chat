import React,{Component} from 'react';
import { Grid } from 'antd-mobile';
import PropTypes from 'prop-types';

//切换头像
export default class AvatarSelector extends Component{
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }
    constructor(props){
        super(props);
        this.state={
        }
    }

    componentDidMount(){

    }

    render (){
        //alls imgName
        const avatarList = 'animate,animate2,animate3,animate4,animate5,girl,girl2,girl3,girl4,girl5,boy,boy2,boy3,boy4,boy5'.split(',').map(item=>({
                               icon:require(`./avatar/${item}.jpg`),
                               text:item
                           }));
        const header = this.state.text ?
            <p style={{paddingLeft:'10px'}}>已选择头像<span style={{marginLeft:'5px', color:'#0890ff'}}>{this.state.text}</span></p>
            :
            <p style={{paddingLeft:'10px'}}>请选择头像</p>;

        return (
            <div>
                {header}
                <Grid
                    data={avatarList}
                    columnNum={5}
                    activeStyle={true}
                    onClick={(item)=> {
                        this.setState({text:item.text})
                        this.props.selectAvatar(item)
                    }}
                />
            </div>

        )
    }
}
