import React, { Component } from 'react';
import AdSense from 'react-adsense';

class Footer extends Component {

    render() {
        return (
            <footer class="page-footer font-small blue">

                <div class="footer-copyright text-center py-1">© 2020 Copyright:
                    <span> Rolstoelhockey</span>
                </div>
                <AdSense.Google
                client='ca-pub-6534700259705406' slot='4972479679'/>
            </footer>
        );
    }
}

export default Footer;