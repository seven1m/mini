require 'rubygems'
require 'firewatir'
require 'test/unit'
require 'cgi'
require 'open-uri'

open('http://localhost:4567/') rescue raise('test_server.rb must be running for this set of tests')

TEST_DIR = File.expand_path(File.dirname(__FILE__) + '/..')
FF = FireWatir::Firefox.start("http://localhost:4567/html/ajax_test.html")

class AjaxTest < Test::Unit::TestCase

  def setup
    @ff = FF
    @ff.link(:text, 'disable mini.ajax.bustcache').click
  end
  
  def test_collect
    @ff.link(:text, 'test collect()').click
    assert_equal 'a changed,b changed,c changed', @ff.div(:id, 'collect_results').text
  end
  
  def test_serialize
    @ff.button(:value, 'test serialize').click
    results = @ff.div(:id, 'serialize_results').text
    unescaped = CGI.unescape(results)
    assert_match    /hideme=i am hidden/,   unescaped
    assert_match    /text_input=some text/, unescaped
    assert_no_match /checkbox_input1=yes/,  unescaped
    assert_match    /checkbox_input2=yes/,  unescaped
    assert_match    /radio_input=value 2/,  unescaped
    assert_no_match /radio_input=value 1/,  unescaped
    assert_match    /select_input=value 1/, unescaped
    assert_no_match /select_input=value 2/, unescaped
    assert_no_match /test serialize/,       unescaped
    assert_match    /textarea_input=here is some text\s*with\s*a line break or two/, unescaped
  end
  
  def test_get
    @ff.link(:text, 'test mini.ajax.get()').click
    assert_equal 'you sent a GET with args {"foo"=>"bar"}', @ff.div(:id, 'get_results').text
  end

  def test_post
    @ff.link(:text, 'test mini.ajax.post()').click
    assert_equal 'you sent a POST with args {"bar"=>"baz"}', @ff.div(:id, 'post_results').text
  end
  
  def test_update
    @ff.link(:text, 'test mini.ajax.update()').click
    assert_equal 'you sent a POST with args {"baz"=>"foo"}', @ff.div(:id, 'update_results').text
  end
  
  def test_submit
    @ff.button(:value, 'test submit').click
    assert_equal 'you sent a POST with args {"foo"=>"bar"}', @ff.div(:id, 'submit_results').text
  end
  
  def test_cache_buster
    @ff.link(:text, 'enable mini.ajax.bustcache').click
    @ff.link(:text, 'test mini.ajax.get()').click
    results = @ff.div(:id, 'get_results').text
    assert_match /you sent a GET with args/, results
    assert_match /"nocache"=>"\d+"/,         results
  end
end
