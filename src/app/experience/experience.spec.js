/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe( 'experience section', function() {
  beforeEach( module( 'ngCv.experience' ) );

  beforeEach( inject( function( $controller, _$location_, $rootScope ) {
    $location = _$location_;
    $scope = $rootScope.$new();
    ExperienceCtrl = $controller( 'ExperienceCtrl', { $location: $location, $scope: $scope });
  }));

  it( 'should have a dummy test', inject( function() {
    expect(ExperienceCtrl).toBeTruthy();
  }));
});



