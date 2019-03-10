import React, { Component } from 'react';
import { Row, Col, Switch } from 'antd';
import AddMovie from "../../components/AddMovie";
import AddTelevision from "../../components/AddTelevision";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "movie"
        };
    }

    componentDidMount() {
        console.log('home');
    }
    onChange = (checked) => {
        checked ? this.setState({view: "movie"}) : this.setState({view: "television"})
    }

    render() {
        return (
        <div className="container">
            <Row type="flex" justify="center">
                <Col md={16} sm={24} className="searchBox">
                    <Row type="flex" justify="center" >
                        <Switch checkedChildren="Movies" unCheckedChildren="Television" defaultChecked onChange={this.onChange} />
                    </Row>
                    {(this.state.view === 'movie') && (
                        <AddMovie/>
                    )}
                    {(this.state.view === 'television') && (
                        <AddTelevision/>
                    )}
                </Col>   
            </Row>
        </div>
        )
    }
}

export default Home;