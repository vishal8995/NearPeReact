import React, {Component} from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import axios from "axios"
import './App.css';
import {
    Row, Col,
    Input, InputGroup, InputGroupText, InputGroupAddon
} from 'reactstrap';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            states:"",
            city: "",
            zipcode:"",
            statesOptions: [],
            cityOptions: [],
            zipcodeOptions: []

        }
        this.handleChange = this.handleChange.bind(this);
        this.fetchOptions = this.fetchOptions.bind(this);
    }

    componentDidMount() {
        this.fetchOptions("states");
    }

    handleChange(change, key){
        switch (key) {

            case "states" :
                this.setState({states: change},()=>{
                    this.fetchOptions("city");
                });
                break;
            case "city" :
                this.setState({city: change}, ()=>{
                    this.fetchOptions("zipcode");
                });
                break;
            case "zipcode" :
                this.setState({zipcode: change});
                break;
        }
    }

    fetchOptions(key){

        switch (key) {

            case "states" :
                axios.get('api/state/options').then(response=>{
                    this.setState({statesOptions: response.data});
                }).catch(error=>{
                    alert("Something went wrong !!");
                })
                break;
            case "city" :
                axios.get('api/city/options?states='+this.state.states).then(response=>{
                    this.setState({cityOptions: response.data});
                }).catch(error=>{
                    alert("Something went wrong !!");
                })
                break;

            case "zipcode" :
                axios.get('api/zipcode/options?city='+this.state.city).then(response=>{
                    this.setState({zipcodeOptions: response.data});
                }).catch(error=>{
                    alert("Something went wrong !!");
                })
                break;
        }

    }


    render() {


        return (
            <div className="App">
                <Row className={"mt-2"}>
                    <Col xl={4} lg={4} md={6} sm={12} xs={12}>
                        State
                        <Input placeholder="State"
                               type={"select"}
                               name={"states"}

                               onChange={(e) => this.handleChange(e.target.value, "states")}
                               value={this.state.states || ''}>
                            <option key={"select"} value={""}>{}</option>
                            {this.state.statesOptions.map(s => {
                                return <option key={s} value={s}>{s}</option>
                            })}
                        </Input>
                    </Col>
                    <Col xl={4} lg={4} md={6} sm={12} xs={12}>
                        City
                        <Input placeholder="City"
                               type={"select"}
                               name={"city"}

                               onChange={(e) => this.handleChange(e.target.value, "city")}
                               value={this.state.city || ''}>
                            <option key={"select"} value={""}>{}</option>
                            {this.state.cityOptions.map((s, sIndex) => {
                                return <option key={sIndex} value={s}>{s}</option>
                            })}
                        </Input>

                    </Col>
                    <Col xl={4} lg={4} md={6} sm={12} xs={12}>
                        Zipcode
                        <Input placeholder="Zipcode"
                               type={"select"}
                               name={"zipcode"}

                               onChange={(e) => this.handleChange(e.target.value, "zipcode")}
                               value={this.state.zipcode || ''}>
                            <option key={"select"} value={""}>{}</option>
                            {this.state.zipcodeOptions.map((s,sIndex) => {
                                return <option key={sIndex} value={s}>{s}</option>
                            })}
                        </Input>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;
