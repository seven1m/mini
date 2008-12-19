#!/usr/bin/env ruby

NAMESPACE = 'mini'
LIBS = %w(ajax)
README = 'README.textile'

content = File.read(README).split(/^h2./).first.strip + "\n\n"

LIBS.each do |lib|
  content << "h2. #{NAMESPACE}.#{lib}\n\n"
  code = File.read(File.join('src', lib + '.js'))
  code.scan(/(^\/\/.+?)(mini\.[a-z0-9_]+\.[a-z0-9_]+)=function\(([a-z0-9_,]*)\)/m).each do |doc, name, args|
    content << "@#{name}(#{args})@\n"
    content << doc.gsub(/^\/\/\s*/, '').sub(/\n+$/, '') + "\n\n"
  end
  File.open(File.join('pkg', lib + '.js'), 'w') { |f| f.write(code.gsub(/^\/\/.+\n/, '').gsub(/^\n/, '').gsub(/\n$/, '')) }
end

File.open(README, 'w') { |f| f.write(content) }
