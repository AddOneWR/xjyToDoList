import React, { Component } from 'react';
import '../css/todoList/todoList.css'
import '../css/todoList/todoList-left.css'
import '../css/todoList/todoList-right.css'
import '../css/todoList/nav-bottom.css'
import $ from 'jquery';
// import 'react-bootstrap-datetimepicker'

//左侧todolist
class LeftList extends Component {
    constructor() {
        super();
        this.state = {
            list: ['aaa', 'bbb', 'ccc'],
            newList: '',
            isAdd: false
        }
    }
    handleList(e) {
        this.setState({
            newList: e.target.value
        })
    }
    handleIsAdd() {
        if (this.state.isAdd)
            this.setState({
                isAdd: false
            })
        else
            this.setState({
                isAdd: true
            })
    }
    handleAdd() {
        let list = this.state.list
        list.push(this.state.newList)
        this.setState({
            list: list,
            newList: '',
            isAdd: false
        })
    }
    render() {
        var add
        if (this.state.isAdd) {
            add = <div className="add-list-div" >
                <div className="input-group">
                    <div className="input-group-addon circle-label color-blue"></div>
                    <input type="text" className="form-control" placeholder="SomeThing" value={this.state.newList} onChange={this.handleList.bind(this)} />
                </div>
                <div>
                    <button type="button" className="btn btn-danger" onClick={this.handleAdd.bind(this)}>添加项目</button>
                    <button type="button" className="btn btn-default" onClick={this.handleIsAdd.bind(this)}>取消</button>
                </div>
            </div>
        }
        else
            add = ''

        return (
            <div>
                <div className="list-group">
                    <a href="#" className="list-group-item">
                        <img src="img/icon-today.png" className="icon-select" />
                        <div>今天</div>
                    </a>
                    <a href="#" className="list-group-item">
                        <img src="img/icon-week.png" className="icon-select" />
                        <div>接下来7天</div>
                    </a>
                </div>
                <div className="todolist-title-left">项目</div>
                <div className="my-todolist">
                    {this.state.list.map((item,index) => {
                        return <div className="list-item" key={index}>
                            <div className="circle-label color-red"></div>
                            <div>{item}</div>
                        </div>
                    })}

                    <div className="list-item">
                        <img className="icon-add" src="./img/icon-add.png" />
                        <div className="addItem" onClick={this.handleIsAdd.bind(this)}>添加项目</div>
                    </div>
                    {add}
                </div>
            </div>
        )
    }
}

class RightList extends Component {
    constructor() {
        super();
        this.state = {
            item: [],
            newItem: {text:'',level:'',time:'2017/11/10'},
            currentPage: 0,
            isUp: true,
            changeItem: -1,
            isAdd: false
        }
    }
    componentDidMount(){
        console.log('begin')
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8000/snippets/',
            success: (res) => {
                console.log(res)
                this.setState({
                    item: res
                })
            },
            fail: () => {
                console.log('fail')
            }
        })
    }
    handleText(e) {
        var newItem =  {text:'',level:'',time: this.state.newItem.time}
        newItem.text = e.target.value
        this.setState({
            newItem: newItem
        })
    }
    handleIsAdd() {
        if (this.state.isAdd){
            document.getElementById('calendar').style.display = 'none'        
            this.setState({
                isAdd: false
            })
        }  
        else
            this.setState({
                isAdd: true
            })
    }
    handleTime(e) {
        var newItem =  {text: this.state.newItem.text ,level:'',time: ''}
        newItem.time = e.target.value
        this.setState({
            newItem: newItem
        })
        console.log(this.state.newItem)
    }
    handleAdd(level) {
        console.log(level)
        let item = this.state.item
        this.state.newItem.level = level
        item.push(this.state.newItem)
        this.setState({
            item: item,
            allPage: Math.floor(item.length / 7),
            newItem: '',
            isAdd: false
        })
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/snippets/',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                text: this.state.newItem.text,
                level: this.state.newItem.level,
                time: this.state.newItem.time
            }),
            success: (res) => {
                console.log(res)
            },
            fail: () => {
                console.log('fail')
            }
        })
        document.getElementById('calendar').style.display = 'none'
    }
    change(val, index,id) {
        if (index > -1) {
            let item = this.state.item
            item[index].text = val
            this.setState({
                item: item
            })
            $.ajax({
                type: 'PUT',
                url: 'http://localhost:8000/snippets/' + id,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    text: item[index].text,
                    level: item[index].level,
                    time: item[index].time
                }),
                success: () => {
                    console.log('success')
                },
                fail: () => {
                    console.log('fail')
                }
            })
        }
        this.setState({
            changeItem: -1
        })
    }
    finish(index, e) {
        e.nativeEvent.stopImmediatePropagation();
        let item = this.state.item
        let id = item[index].id
        item.splice(index, 1)
        this.setState({
            item: item
        })
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8000/snippets/' + id,
            success: () => {
                console.log('success')
            },
            fail: () => {
                console.log('fail')
            }
        })
        alert('完成一个任务啦!')
    }
    deleteItem(index){
        let item = this.state.item
        let id = item[index].id
        item.splice(index, 1)
        this.setState({
            item: item
        })
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8000/snippets/' + id,
            success: () => {
                console.log('success')
            },
            fail: () => {
                console.log('fail')
            }
        })
    }
    changePage(index) {
        this.setState({
            currentPage: index
        })
    }
    compare(prop,option) {
        let _this = this
        return function (obj1, obj2) {
            let val1 = obj1[prop];
            let val2 = obj2[prop];
            if(option == 1){
                //降序
                _this.setState({
                    isUp: true
                })
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }
            }else if(option == 0){
                //升序
                _this.setState({
                    isUp: false
                })
                if (val1 > val2) {
                    return -1;
                } else if (val1 < val2) {
                    return 1;
                } else {
                    return 0;
                } 
            }     
        } 
    }
    sort(){
        let item = this.state.item
        if(this.state.isUp)
            item.sort(this.compare("level",0))
        else
            item.sort(this.compare("level",1))    
        this.setState({
            item: item
        })
    }
    render() {
        //下方添加项目
        var add
        if (this.state.isAdd) {
            add = <div className="add-list-div" style={{ zIndex: 100 }}>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="SomeThing" value={this.state.newItem.text} onChange={this.handleText.bind(this)} />
                        </div>
                        <div>
                            <div className="btn-group brothe-btn">
                                <button type="button" className="btn btn-danger" onClick={this.handleAdd.bind(this,3)} style={{marginRight:0}}>3级优先</button>
                                <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="caret"></span>
                                    <span className="sr-only">Toggle Dropdown</span>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a href="#" onClick={this.handleAdd.bind(this,3)}>3级优先</a></li>
                                    <li><a href="#" onClick={this.handleAdd.bind(this,2)}>2级优先</a></li>
                                    <li><a href="#" onClick={this.handleAdd.bind(this,1)}>1级优先</a></li>
                                </ul>
                            </div>
                            <button type="button" className="btn btn-default brothe-btn" onClick={this.handleIsAdd.bind(this)}>取消</button>
                        </div>
                    </div>
        }
        else
            add = ''

        //项目内容修改
        let list = this.state.item.map((item, index) => {
            if (index < (this.state.currentPage + 1) * 7 && index >= this.state.currentPage * 7)
                return (
                    <div
                        onClick={(e) => {
                            if (this.state.changeItem === -1 && e.target.nodeName === 'DIV')
                                this.setState({
                                    changeItem: index
                                })
                        }} key={index}>
                        {
                            this.state.changeItem === index ?
                                <ChangeInput index={index}
                                    item={this.state.item}
                                    change={this.change.bind(this)} 
                                    listId={item.id} key={index}/> : <div className="list-item" key={index}>
                                                                            <span className={`circle-label checkbox l${item.level}`} onClick={this.finish.bind(this, index)}></span>
                                                                            <div className="todo-text">{item.text}
                                                                            <img src="./img/delete.png" className="deleteImg" onClick={this.deleteItem.bind(this, index)}/>
                                                                            <span style={{float:'right'}}>{item.time}</span>
                                                                           
                                                                            </div>
                                                                            
                                                                        </div>
                        }
                    </div>
                )
        })
        return (
            <div>
                
                <p className="todolist-title-right">个人<button className="btn btn-success btn-sort" onClick={this.sort.bind(this)}>优先级排序</button></p>
                {list}
                <div className="list-item">
                    <img className="icon-add" src="./img/icon-add.png" />
                    <div className="addItem" id="addTask" onClick={this.handleIsAdd.bind(this)}>添加任务</div>
                </div>
                {add}
                <div className="btn-group brothe-btn" id="calendar">
                    <form className="form-horizontal">
                        <fieldset>
                            <div className="control-group">
                                <div className="controls">
                                    <div className="input-prepend input-group">
                                        <input type="text" style={{width: 100}} name="birthday" id="birthday"
                                        className="form-control" value={this.state.newItem.time} onChange={this.handleTime.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <BottomNav
                    item={this.state.item}
                    changePage={this.changePage.bind(this)}
                    currentPage={this.state.currentPage}
                    allPage={this.state.allPage} />
            </div>
        )
    }
}

class ChangeInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            index: this.props.index,
            newMessage: this.props.item[this.props.index].text,
            listId: this.props.listId
        }
    }
    handleChange(e) {
        this.setState({
            newMessage: e.target.value
        })
    }
    change(index) {
        if (index === 'save') {
            this.props.change(this.state.newMessage, this.state.index, this.state.listId)
        } else {
            this.props.change(this.state.newMessage, -1,-1)
        }
    }
    render() {
        return (
            <div className="add-list-div">
                <div className="input-group">
                    <input type="text" className="form-control" value={this.state.newMessage} onChange={this.handleChange.bind(this)} />
                </div>
                <div>
                    <button type="button" className="btn btn-danger" onClick={this.change.bind(this, 'save')}>保存</button>
                    <button type="button" className="btn btn-default" onClick={this.change.bind(this, -1)}>取消</button>
                </div>
            </div>
        )
    }
}

class BottomNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            currentPage: this.props.currentPage
        }
    }
    changePage(index) {
        console.log('当前页: ' + this.state.currentPage + ' index：' + index)
        if (index === 'pre' && this.state.currentPage > 0) {
            this.setState({
                currentPage: --this.state.currentPage
            })
        }
        else if (index === 'next' && this.state.currentPage < this.props.allPage) {
            this.setState({
                currentPage: ++this.state.currentPage
            })
        } else if (index >= 0) {
            this.state.currentPage = index
            this.setState({
                currentPage: index
            })
        }
        console.log('更改后页: ' + this.state.currentPage)
        this.props.changePage(this.state.currentPage)
    }
    render() {
        let arr = []
        for (var i = 0; i <= this.state.item.length / 7; i++) {
            arr.push(<li key={i}><a href="#" onClick={this.changePage.bind(this, i)}>{i + 1}</a></li>)
        }
        return (
            <nav aria-label="Page navigation" className="nav-bottom">
                <ul className="pagination">
                    <li>
                        <a href="#" aria-label="Previous" onClick={this.changePage.bind(this, 'pre')}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {arr}
                    <li>
                        <a href="#" aria-label="Next" onClick={this.changePage.bind(this, 'next')}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}
class ToDoList extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <div className="main-div row">
                <div className="col-md-4 todolist-left">
                    <LeftList />
                </div>
                <div className="col-md-8 todolist-right">
                    <RightList />
                </div>
            </div>
        );
    }
}

export default ToDoList;
