#!/usr/bin/env perl

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
	} elsif ( $line =~ m/^$var\[.*=\s*\"(.*?)\"/) {
		$root = $1;
		if ( $root ne "") { $array .= "'$root',"; }
	}
}

chop($array);
$array .= "]\n";
print "$var=$array\n"
