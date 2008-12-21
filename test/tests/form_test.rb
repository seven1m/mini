require 'rubygems'
require 'firewatir'
require 'test/unit'
require 'cgi'
require 'open-uri'

TEST_DIR = File.expand_path(File.dirname(__FILE__) + '/..')
FF = FireWatir::Firefox.start("http://localhost:4567/html/form_test.html")

class FormTest < Test::Unit::TestCase

  def setup
    @ff = FF
  end
  
  def test_labelfor
    @ff.link(:text, 'test labelfor 1').click
    assert_equal '[object HTMLLabelElement]', @ff.div(:id, 'results').text
    @ff.link(:text, 'test labelfor 2').click
    assert_equal '[object HTMLLabelElement]', @ff.div(:id, 'results').text
  end
  
  def test_validation_failure
    @ff.startClicker('OK')
    @ff.link(:text, 'test validate 1').click
    assert_equal 'true',  @ff.div(:id, 'results').text
    @ff.link(:text, 'test validate 2').click
    assert_equal 'false', @ff.div(:id, 'results').text
    assert_equal 'error', @ff.label(:id, 'text2_label').attribute_value('class')
    @ff.link(:text, 'test validate 3').click
    assert_equal 'false', @ff.div(:id, 'results').text
    @ff.link(:text, 'test validate 4').click
    assert_equal 'false', @ff.div(:id, 'results').text
    assert_equal 'error', @ff.label(:id, 'checkbox1_label').attribute_value('class')
    @ff.link(:text, 'test validate 5').click
    assert_equal 'false', @ff.div(:id, 'results').text
    assert_equal 'error', @ff.label(:id, 'radio1_label').attribute_value('class')
    assert_equal 'error', @ff.label(:id, 'radio2_label').attribute_value('class')
  end
  
end
