var React = require('react/addons');
var Webcam = require('webcamjs');
var UserActions = require('../actions/user-actions');
var UsersStore = require('../stores/users-store');
var ReactBootstrap = require('react-bootstrap');

var UpdatePhoto = React.createClass({
  getInitialState: function() {
    return {
      showModal: false
    }
  },
  
  handleCamera: function(e) {
    e.preventDefault();
    this.setState({showModal: true});
    $('.camera-modal').on('shown', function () {
      Webcam.attach('.my-camera');
    });
  },
  
  takeSnapshot: function() {
    Webcam.snap(function(data_uri) {
      // Show result to user
      $('.my-result').html('<img src="'+data_uri+'"/>');
      
      // Update user snapshot
      var current_user = UsersStore.getCurrentUser();
      UserActions.updateSnapshot({id: current_user.id, snapshot: data_uri});
    });
  },
  
  closeModal: function() {
    this.setState({showModal: false});
    clearTimeout(this.snapshotTimer);
  },
  
  showModal: function() {
    this.setState({showModal: true});
  },
  
  updatePhoto: function() {
    // Setup webcam feed
    Webcam.set({
      width: 320,
      height: 240,
      dest_width: 320,
      dest_height: 240,
      image_format: 'jpeg',
      jpeg_quality: 40
    })
    
    // Attach webcam feed
    Webcam.attach('.my-camera');
    
    // Take snapshot
    var self = this;
    this.snapshotTimer = setTimeout(function() {
      self.takeSnapshot();
      setTimeout(function() {
        // Close snapshot modal
        self.setState({showModal: false});
      }, 1500);
    }, 3000);
  },
  
  render: function() {
    var Modal = ReactBootstrap.Modal;
    var Button = ReactBootstrap.Button;
    
    return (<div className="upload-photo">
              <Modal dialogClassName="camera-modal" onEnter={this.updatePhoto} show={this.state.showModal} onHide={this.closeModal}>
                <Modal.Body>
                  <div className="my-camera"></div>
                  <div className="my-result"></div>
                </Modal.Body>
              </Modal>
              
              <a href="..." className="update-image-btn" onClick={this.handleCamera}>
                <span className="glyphicon glyphicon-camera" aria-hidden="true"></span>
              </a>
            </div>)
  },
  
  componentWillUpdate: function() {
  }
});

module.exports = UpdatePhoto;

