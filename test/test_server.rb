require 'rubygems'
require 'sinatra'

get '/' do
  "test_server.rb is running"
end

get '/echo' do
  "you sent a GET with args #{params.inspect}"
end

post '/echo' do
  "you sent a POST with args #{params.inspect}"
end
