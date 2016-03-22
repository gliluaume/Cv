/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe('skill section', function() {
  beforeEach( module( 'ngCv.skill' ) );

  beforeEach( inject( function( $controller, _$location_, $rootScope ) {
    $location = _$location_;
    $scope = $rootScope.$new();
    SkillCtrl = $controller( 'SkillCtrl', { $location: $location, $scope: $scope });
  }));

  it( 'should have a dummy test', inject( function() {
    expect(SkillCtrl).toBeTruthy();
  }));
});



