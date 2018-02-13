module.exports = {
  apps: [{
    name: 'Surge_Reactor_Riders',
    script: './server/index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-215-142-204.us-west-1.compute.amazonaws.com',
      key: '~/.ssh/Surge_Reactor_K.pem',
      ref: 'origin/master',
      repo: 'git@github.com:Haydenmarx/hrsf87-thesis',
      path: '/home/ubuntu/hrsf87-thesis',
      'post-deploy': 'npm install && npm run-script restart'
    }
  }
};