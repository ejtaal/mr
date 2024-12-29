#!/usr/bin/env perl
# Very simple JS minifier for my specific needs:
# === Turns: ===
# var a=[]
# for (i=0;i<=2;i++) a[i] = ''
# a[3]='c'
# a[4]='d'
# === Into: ===
# a=['','','','c','d']

print STDERR "Minifying <STDIN>...\n";
print STDERR "Book no. - Name - No of entries\n";

my $var = "";
my $array = "";
my $root = "";
my $var_roots = 0;
my $books = 0;

LINE: while (<STDIN>) {
	my $line = $_;
	chomp( $line);
	if ( $line =~ m/^var (.*?)\s*=\s*\[\]/) {
		$books++;
		if ( $var ne "") {
			chop($array);
			$array .= "]";
			print "$var=$array\n";
			$array = "";
			print STDERR "$var_roots.\n";
			$var_roots = 0;
		}
		#print "var = [$1]\n";
		$var = $1;
		print STDERR "$books. $var ... ";
		$array = "["
	} elsif ( $line =~ m/^for .*\<\=(\d+)/) {
		$empty_fields = $1;
		for (my $i = 0; $i <= $empty_fields; $i++) {
			$array .= "'',"; $var_roots++;
		}
	} elsif ( $line =~ m/^$var\[.*=\s*[\"\'](.*?)[\"\']/) {
		$root = $1;
		if ( $root eq "") { print STDERR "Nil line? [$line]\n"; }
		$array .= "'$root',"; $var_roots++; 
		#}
	}
}

chop($array);
$array .= "]\n";
print "$var=$array\n";
print STDERR "$var_roots.\n";
