#!/usr/bin/env perl
# Very simple JS minifier for my specific needs:
# === Turns: ===
# var a=[]
# for (i=0;i<=2;i++) a[i] = ''
# a[3]='c'
# a[4]='d'
# === Into: ===
# a=['','','','c','d']

my $var = "";
my $array = "";
my $root = "";

LINE: while (<STDIN>) {
	my $line = $_;
	chomp( $line);
	if ( $line =~ m/^var (.*?)\s*=\s*\[\]/) {
		if ( $var ne "") {
			chop($array);
			$array .= "]";
			print "$var=$array\n";
			$array = "";
		}
		#print "var = [$1]\n";
		$var = $1;
		$array = "["
	} elsif ( $line =~ m/^for .*\<\=(\d+)/) {
		$empty_fields = $1;
		for (my $i = 0; $i <= $empty_fields; $i++) {
			$array .= "'',";
		}
	} elsif ( $line =~ m/^$var\[.*=\s*[\"\'](.*?)[\"\']/) {
		$root = $1;
		if ( $root ne "") { $array .= "'$root',"; }
	}
}

chop($array);
$array .= "]\n";
print "$var=$array\n"
