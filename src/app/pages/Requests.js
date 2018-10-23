import React, { Component } from 'react';
import {
    Table, Badge, Container, Button,
    Form, FormGroup, FormText, FormFeedback,
    Input, Label, Row, Col, Alert,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import { connect } from 'react-redux';
import { fetchRequests, saveSearchValue, abortFetchingRequests } from '../actions/Request/requestActions';
import { ListPagination } from '../component/ListPagination';
import { fetchStepchartLevels, fetchCoopStepchartLevels, fetchStepchartTypes, fetchAllStepchartLevels, fetchRequestStatus, fetchCommonData } from '../actions/Common/commonActions';

const hStyle = {
    margin: '20px 20px'
};

class Requests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: {},
            deleteModal: false
        }

        // this.props.fetchCommonData();
        // this.props.fetchAllStepchartLevels();

        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    }

    toggleDeleteModal() {
        this.setState({
            deleteModal: !this.state.deleteModal
        });
    }

    componentDidMount() {
        console.log('request mounted');

        this.props.fetchRequests();

        if (this.props.formValue) {
            const formValue = this.props.formValue;
            this.patchFormValue(formValue);
        }
    }

    componentWillUnmount() {
        console.log('request unmounted');
        this.props.abortFetchingRequests();
    }

    patchFormValue = (formValue) => {
        this.setState({
            formValue: formValue
        });

        for (var k in formValue) {
            document.getElementById(k).value = formValue[k];
        }
    }

    onPageChanged = (pageNumber) => {
        const queryParams = this.props.requestResult.queryParams;
        this.props.fetchRequests(pageNumber, queryParams);
        scrollToTop(document.getElementById('request-list').scrollTop);

        function scrollToTop(scrollDuration) {
            var cosParameter = window.scrollY / 2,
                scrollCount = 0,
                oldTimestamp = performance.now();
            function step(newTimestamp) {
                scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
                if (scrollCount >= Math.PI) window.scrollTo(0, 0);
                if (window.scrollY === 0) return;
                window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
                oldTimestamp = newTimestamp;
                window.requestAnimationFrame(step);
            }
            window.requestAnimationFrame(step);
        }
    };

    onMasterCheckboxChanged = (event) => {
        // console.log('Master Checkbox Changed: ' + event.target.checked);
        const isMasterCheckboxChecked = event.target.checked;
        let itemCheckboxes = document.getElementsByClassName('item-checkbox');
        for (let i = 0; i < itemCheckboxes.length; i++) {
            itemCheckboxes[i].checked = isMasterCheckboxChecked ? true : false;
        }
    }

    onItemCheckboxChanged = (event) => {
        const checkedCheckboxValues = this.getCheckedCheckboxValues();
        const totalItems = document.getElementsByClassName('item-checkbox').length;
        const masterCheckboxElement = document.getElementById('master-checkbox');
        console.log(`Item checkbox ${event.target.value} check changed: ${event.target.checked}`);
        if (checkedCheckboxValues.length > 0) {
            masterCheckboxElement.checked = (checkedCheckboxValues.length === totalItems) ? true : false
        } else {
            masterCheckboxElement.checked = false;
        }
    }

    getCheckedCheckboxValues() {
        const checkedCheckboxes = document.querySelectorAll('.item-checkbox:checked');
        let checkedCheckboxesValue = [];
        for (var i = 0; checkedCheckboxes[i]; ++i) {
            checkedCheckboxesValue.push(checkedCheckboxes[i].value);
        }
        return checkedCheckboxesValue;
    }

    onHandlingSearch = (event) => {
        event.preventDefault();
        const formValue = this.state.formValue;
        // this.props.saveSearchValue(formValue);
        // this.props.fetchRequests(1, formValue);
    }

    onHandleChange = (e) => {
        console.log(e.target.name + ' Changed: ' + e.target.value);

        let newState = Object.assign({}, this.state.formValue, {
            [e.target.name]: e.target.value
        })

        this.setState({
            formValue: newState
        })

    }

    onStepchartTypeChanged = (event) => {
        var element = document.getElementById('stepchart_level');

        const selectedStepchartType = event.target.value;
        switch (selectedStepchartType) {
            case '': element.selectedIndex = 0; this.props.fetchAllStepchartLevels(); break;
            case 'co-op':
                this.props.fetchCoopStepchartLevels();
                break;
            default: this.props.fetchStepchartLevels();
        }


        let newState = Object.assign({}, this.state.formValue, {
            [event.target.name]: event.target.value
        })

        this.setState({
            formValue: newState
        })

        setTimeout(function () {
            //reflect value changes
            var evt = document.createEvent('HTMLEvents');
            element.value = element.value;
            evt.initEvent('change', true, true);
            element.dispatchEvent(evt);
        })

    }

    renderResult() {
        const self = this;
        const requestResult = self.props.requestResult;
        const error = self.props.error;
        if (!error) {
            return (requestResult.totalItems > 0 ?
                <Alert color="success">
                    Total <strong>{requestResult.totalItems}</strong> item(s)
                </Alert> :
                <Alert color="danger">
                    No items
            </Alert>)
        } else {
            return (<Alert color="danger">
                <h4>Error: </h4>
                {error.message}
            </Alert>)
        }
    }

    renderModal() {
        return (
            <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
                <ModalHeader toggle={this.toggleDeleteModal}>Modal title</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggleDeleteModal}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggleDeleteModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

    render() {
        const self = this;
        const requestResult = self.props.requestResult;
        // const stepchartLevelItems = self.props.stepchartLevelItems;
        // const stepchartTypeItems = self.props.stepchartTypeItems;
        // const statusItems = self.props.statusItems;
        // const error = self.props.error;

        function importAll(r) {
            // return r.keys().map(r);
            let images = {};
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
            return images;
        }

        var stepLevelImages = importAll(require.context('../assets/images/stepball_levels/', false, /\.(png|jpe?g|svg)$/));

        if (requestResult) {
            const requestItems = requestResult.items;

            return (
                <div>
                    {this.renderModal()}
                    <h1 className="text-center" style={hStyle}>Request Page</h1>
                    <Container fluid>
                        {/* <Container className="b-search-form-container" fluid>
                            <Form onSubmit={this.onHandlingSearch}>
                                <Row form>
                                    <Col lg={3} md={6}>
                                        <FormGroup>
                                            <Label for="search_admin">Search</Label>
                                            <Input type="text" name="search_admin" id="search_admin" onChange={self.onHandleChange} placeholder="Search" />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={3} md={6}>
                                        <FormGroup>
                                            <Label for="stepchart_type">Stepchart Types</Label>
                                            <Input type="select" name="stepchart_type" id="stepchart_type" onChange={self.onStepchartTypeChanged}>
                                                {
                                                    stepchartTypeItems.map((item, index) => {
                                                        return <option key={index} value={item.value}>{item.title}</option>
                                                    })
                                                }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={3} md={6}>
                                        <FormGroup>
                                            <Label for="stepchart_level">Stepchart Levels</Label>
                                            <Input type="select" name="stepchart_level" id="stepchart_level" onChange={self.onHandleChange}>
                                                {
                                                    stepchartLevelItems.map(item => {
                                                        return <option key={item.value} value={item.value}>{item.title}</option>
                                                    })
                                                }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={3} md={6}>
                                        <FormGroup>
                                            <Label for="status">Status</Label>
                                            <Input type="select" name="status" id="status" onChange={self.onHandleChange}>
                                                {
                                                    statusItems.map(item => {
                                                        return <option key={item.value} value={item.value}>{item.title}</option>
                                                    })
                                                }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button color="primary" type='submit' onClick={self.onHandlingSearch}>Search</Button>
                            </Form>
                        </Container>
                        {this.renderResult()} */}
                        <Table id='request-list' hidden={requestResult.items.length === 0} responsive>
                            <thead>
                                <tr>
                                    <th><Input id={"master-checkbox"} className={'table-checkbox'} type='checkbox' onChange={self.onMasterCheckboxChanged} /></th>
                                    <th>Song Name</th>
                                    <th>Level</th>
                                    <th>Requester</th>
                                    <th>STEPMAKER</th>
                                    <th>Request Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    requestItems.map(function (requestItem, index) {
                                        const stepchartInfo = requestItem.stepchart_info;
                                        const requestStatus = requestItem.status;
                                        const badgeColor = requestStatus.client_label_class.split('-')[1].toString();
                                        const imgName = `${stepchartInfo.stepchart_type_value}-${stepchartInfo.stepchart_level}.png`;
                                        return <tr key={requestItem._id}>
                                            <td><Input className={'table-checkbox item-checkbox'} value={requestItem._id} type='checkbox' onClick={self.onItemCheckboxChanged} /></td>
                                            <td>{requestItem.song_name}</td>
                                            <td><img className="stepball" src={stepLevelImages[imgName]} /></td>
                                            <td>{requestItem.requester}</td>
                                            <td>{requestItem.stepmaker}</td>
                                            <td>{new Date(requestItem.request_date).toLocaleString()}</td>
                                            <td>
                                                <h4><Badge color={badgeColor}>{requestStatus.display_text}</Badge></h4>
                                            </td>
                                            <td>
                                                <Button color="primary">Edit</Button>
                                                &nbsp;
                                                <Button color="danger" onClick={self.toggleDeleteModal}>Delete</Button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                        {requestResult.items.length > 0 ? <ListPagination onPageChanged={self.onPageChanged} result={requestResult} /> : null}
                    </Container>

                </div>
            );
        } else {
            return (null);
        }
    }
}

const mapStateToProps = state => ({
    requestResult: state.requests.result,
    formValue: state.requests.formValue,
    stepchartLevelItems: state.common.stepchartLevelItems,
    stepchartTypeItems: state.common.stepchartTypeItems,
    statusItems: state.common.statusItems,
    error: state.requests.error
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRequests: (page, params) => {
            dispatch(fetchRequests(page, params));
        },
        abortFetchingRequests: () => {
            dispatch(abortFetchingRequests());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Requests)