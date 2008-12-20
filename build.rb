#!/usr/bin/env ruby

NAMESPACE = 'mini'
LIBS = %w(ajax)
README = 'README.textile'

content = File.read(README).split(/^h2./).first.strip + "\n\n"

LIBS.each do |lib|
  content << "h2. #{NAMESPACE}.#{lib}\n\n"
  code = File.read(File.join('src', lib + '.js'))
  code.scan(/((^\/\/.+?\n)+)(mini\.[a-z0-9_]+\.[a-z0-9_]+)=function\(([a-z0-9_,]*)\)/).each do |doc, dummy, name, args|
    content << "h3. #{name}(#{args})\n"
    content << doc.gsub(/^\/\/\s*/, '').sub(/\n+$/, '') + "\n\n"
  end
  code = code.gsub(/^\/\/.+\n/, '').gsub(/^ +/, '').gsub(/([,'"\w;\{\}\(\)])\n/, '\1')
  File.open(File.join('pkg', lib + '.js'), 'w') { |f| f.write(code) }
  File.open(File.join('test/public/js', lib + '.js'), 'w') { |f| f.write(code) }
end

File.open(README, 'w') { |f| f.write(content) }
