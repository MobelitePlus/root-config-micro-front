var gulp = require('gulp');
var bump = require('gulp-bump');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var pckg = require('./package.json');
var util = require('gulp-util');
// var sonar = require('gulp-sonar');
// var sonarqubeScanner = require('sonarqube-scanner');
// var sleep = require('sleep');
// var os = require('os');
// var request = require('ajax-request');

// const projectKey='root-config-micro-front';
// const projectName='root config micro front';

// fetch command line arguments
const arg = (argList => {
  let arg = {},
    a,
    opt,
    thisOpt,
    curOpt;
  for (a = 0; a < argList.length; a++)
    (thisOpt = argList[a].trim()),
      (opt = thisOpt.replace(/^\-+/, '')),
      opt === thisOpt
        ? (curOpt && (arg[curOpt] = opt), (curOpt = null))
        : ((curOpt = opt), (arg[curOpt] = !0));
  return arg;
})(process.argv);

//Reports
// gulp.task('reports', function() {
//   return runSequence('lint_scss', 'lint_ts', function(err) {
//     if (err) {
//       var exitCode = 2;
//       console.log('[ERROR] build  gulp  task failed', err);
//       console.log('[FAIL] build  task failed - exiting with code ' + exitCode);
//       return process.exit(exitCode);
//     }
//   });
// });

/* Coding standard control and Quality inspection */
// function waitTask() {
//   sleep.sleep(5);
//   const project_key = projectKey + '.' + process.env.DEV_USERNAME.trim();
//   const project_name =
//     projectName + ' ' + process.env.DEV_USERNAME.trim();
//   const sonar_server = 'http://192.168.1.161';
//   request(
//     {
//       url: sonar_server + '/api/ce/component?component=' + project_key,
//       method: 'GET',
//       json: true,
//       async: false
//     },
//     function(err, res, body) {
//       if (body.queue.length != 0) {
//         waitTask();
//       } else {
//         getQualityGate();
//       }
//     }
//   );
// }

// function getQualityGate() {
//   const project_key = projectKey + '.' + process.env.DEV_USERNAME.trim();
//   const project_name =
//     projectName + ' ' + process.env.DEV_USERNAME.trim();
//   const sonar_server = 'http://192.168.1.161';
//   request(
//     {
//       url:
//         sonar_server +
//         '/api/qualitygates/project_status?projectKey=' +
//         project_key,
//       method: 'GET',
//       json: true
//     },
//     function(err, res, body) {
//       console.log(body.projectStatus.status);
//       //console.log(body[0].msr[0].data);
//     }
//   );
// }

// gulp.task('sonar-scanner', function(callback) {
//   const project_key = projectKey + '.' + process.env.DEV_USERNAME.trim();
//   const project_name =
//     projectName + ' ' + process.env.DEV_USERNAME.trim();
//   const sonar_server = 'http://192.168.1.161';
//   var project_version;
//   request(
//     {
//       url: sonar_server + '/api/project_analyses/search?project=' + project_key,
//       method: 'GET',
//       json: true,
//       async: false
//     },
//     function(err, res, body) {
//       try {
//         if (body.analyses.length > 0) {
//           var previous_version;
//           body.analyses[0].events.forEach(function(object) {
//             if (object.category == 'VERSION') {
//               previous_version = object.name;
//             }
//           });
//           project_version = bumpVersion(previous_version);
//         }
//       } catch (err) {
//         project_version = '99.99.0';
//       }
//       console.log('arg.file: ', arg.file);
//       sonarqubeScanner(
//         {
//           serverUrl: sonar_server,
//           options: {
//             'sonar.projectKey': project_key,
//             'sonar.projectName': project_name,
//             'sonar.projectVersion': project_version,
//             'sonar.sources': arg.file
//           }
//         },
//         callback
//       );
//       console.log('waiting SonarQube Task');
//       waitTask();
//     }
//   );
// });

// gulp.task('dev-task-runner-v1', function() {
//   runSequence('sonar-scanner'); //"run-tests", "sonar-scanner"
// });

function bumpVersion(str) {
  var tab = str.split('.');
  return (version = tab[0] + '.' + tab[1] + '.' + (parseInt(tab[2]) + 1));
}

//Report Karma
// gulp.task('karma', function generateKarmaReports() {
//   return gulp
//     .src(['./'])
//     .pipe(
//       shell([
//         'node --max_old_space_size=9000 node_modules/karma/bin/karma start ./karma.conf.js'
//       ])
//     );
// });

//Report lint SCSS
// gulp.task('lint_scss', function lintCssTask() {
//   const gulpStylelint = require('gulp-stylelint');
//   const myStylelintFormatter = require('stylelint-checkstyle-formatter');
//   return gulp.src('src/**/*.scss').pipe(
//     gulpStylelint({
//       configFile: '.stylelintrc',
//       failAfterError: false,
//       reportOutputDir: './reports/',
//       reporters: [
//         { formatter: myStylelintFormatter, save: 'stylelint-result.xml' }
//       ],
//       debug: true
//     })
//   );
// });

//Report lint Typescript
// gulp.task('lint_ts', function() {
//   return gulp
//     .src([
//       './src/app/**/*.ts',
//       '!./src/app/**/*.spec.ts',
//       '!./src/app/services'
//     ])
//     .pipe(tslint({ configuration: './tslint.json' }))
//     .pipe(
//       tslintReporter({
//         sort: true,
//         filename: './reports/tslint-result.xml'
//       })
//     );
// });

//start Test( create coverage folder with webpack and karma.conf)
// function startTest() {
//   return gulp
//     .src(['./'])
//     .pipe(shell(['npm run test']))
//     .pipe(gulp.dest('./'));
// }
// gulp.task('test', function() {
//   return startTest();
// });

//Bumping version
function incrementVersion(importance) {
  // get all the files to bump version in
  return (
    gulp
      .src(['./package.json'])
      // bump the version number in those files
      .pipe(bump({ type: importance }))
      // save it back to filesystem
      .pipe(gulp.dest('./'))
  );
}
gulp.task('patch', function() {
  return incrementVersion('patch');
});
gulp.task('feature', function() {
  return incrementVersion('minor');
});
gulp.task('prerelease', function() {
  return incrementVersion('prerelease');
});
gulp.task('release', function() {
  return incrementVersion('major');
});

// generate build webpack ( create dist folder with webpack)
// function generateDistDoc() {
//   return gulp
//     .src(['./'])
//     .pipe(shell(['npm run build:doc']))
//     .pipe(gulp.dest('./'));
// }

// gulp.task('dist-doc', function() {
//   return generateDistDoc();
// });

// function generateDistRec() {
//   return gulp
//     .src(['./'])
//     .pipe(shell(['npm run build-rec']))
//     .pipe(gulp.dest('./'));
// }

// gulp.task('dist-rec', function() {
//   return generateDistRec();
// });

// function generateDistItg() {
//   return gulp
//     .src(['./'])
//     .pipe(shell(['npm run build-itg']))
//     .pipe(gulp.dest('./'));
// }

// gulp.task('dist-itg', function() {
//   return generateDistItg();
// });

//compression projet
function zipProject() {
  return gulp
    .src(['./'])
    .pipe(shell(['npm run zip']))
    .pipe(gulp.dest('./'));
}

gulp.task('preparePackage', function() {
  return zipProject();
});

// gulp.task('build-itg', function(done) {
//   runSequence('dist-itg', 'preparePackage', function(err) {
//     //if any error happened in the previous tasks, exit with a code > 0
//     if (err) {
//       var exitCode = 2;
//       console.log('[ERROR] build  gulp  task failed', err);
//       console.log('[FAIL] build  task failed - exiting with code ' + exitCode);
//       return process.exit(exitCode);
//     }
//   });
// });

// gulp.task('build-rec', function(done) {
//   runSequence('dist-rec', 'preparePackage', function(err) {
//     //if any error happened in the previous tasks, exit with a code > 0
//     if (err) {
//       var exitCode = 2;
//       console.log('[ERROR] build  gulp  task failed', err);
//       console.log('[FAIL] build  task failed - exiting with code ' + exitCode);
//       return process.exit(exitCode);
//     }
//   });
// });

//suppression de l'archive root-config-micro-front.zip
function deleteCompressedProject() {
  return gulp
    .src(['./'])
    .pipe(shell(['rm -f root-config-micro-front.zip']))
    .pipe(gulp.dest('./'));
}

gulp.task('deleteCompressedProject', function() {
  return deleteCompressedProject();
});

gulp.task(
  'injectEnvVariable',
  shell.task([
    'echo RELEASE_VERSION= ' + pckg.version + ' > envVars.properties'
  ])
);

//git tasks
function prepare(branch) {
  // get all the files to bump version in
  return (
    gulp
      .src(['./'])
      // bump the version number in those files
      .pipe(
        shell([
          'git config --local credential.helper store',
          'git checkout ' + branch
        ])
      )
      // save it back to filesystem
      .pipe(gulp.dest('./'))
  );
}
gulp.task('gitPrepare', function() {
  return prepare(util.env.branch);
});

gulp.task('gitAdd', shell.task(['git add  -A']));

function pushToGit(remote, branch) {
  // get all the files to bump version in
  return (
    gulp
      .src(['./'])
      // bump the version number in those files
      .pipe(shell('git push ' + remote + ' ' + branch))
      // save it back to filesystem
      .pipe(gulp.dest('./'))
  );
}

gulp.task('gitCommitWithMessage', function() {
  return gitCommit(util.env.message);
});

function gitCommit(message) {
  return gulp
    .src(['./'])
    .pipe(shell(['git commit -m "' + message + '"']))
    .pipe(gulp.dest('./'));
}

gulp.task('gitUpdateRepository', function(callback) {
  runSequence('gitAdd', 'gitCommitWithMessage', function(err) {
    //if any error happened in the previous tasks, exit with a code > 0
    if (err) {
      var exitCode = 2;
      console.log('[ERROR] gulp build task failed', err);
      console.log(
        '[FAIL] gulp build task failed - exiting with code ' + exitCode
      );
      return process.exit(exitCode);
    } else {
      return pushToGit(util.env.remote, util.env.branch);
    }
  });
});
///////////////////////////////////////////////////////////
//Functionnal tests
function prepareXvfb() {
  return gulp
    .src(['./'])
    .pipe(shell(['Xvfb :2 -ac -screen 0 1280x1024x24 &']))
    .pipe(gulp.dest('./'));
}

gulp.task('loadXvfb', function() {
  return prepareXvfb();
});
function prepareExport() {
  return gulp
    .src(['./'])
    .pipe(shell(['export DISPLAY=:2']))
    .pipe(gulp.dest('./'));
}

gulp.task('exportDisplay', function() {
  return prepareExport();
});

function executeFT() {
  return gulp
    .src(['./'])
    .pipe(shell(['npm run e2e']))
    .pipe(gulp.dest('./'));
}

gulp.task('runFT', function() {
  return executeFT();
});
function stopXvfb() {
  return gulp
    .src(['./'])
    .pipe(shell(['killall Xvfb']))
    .pipe(gulp.dest('./'));
}

gulp.task('killXvfb', function() {
  return stopXvfb();
});

function runTests() {
  return gulp
    .src(['./'])
    .pipe(shell(['npm run unit'])) //"npm run unit && npm run e2e"
    .pipe(gulp.dest('./'));
}

gulp.task('run-tests', function() {
  return runTests();
});
