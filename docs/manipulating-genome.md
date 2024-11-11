# Steps for manipulating a genome and producing output files

https://www.biostars.org/p/150010/ (thanks jdimatteo)

https://web.archive.org/web/20161010092833/http://biobits.org/samtools_primer.html

https://www.melbournebioinformatics.org.au/tutorials/

1. Download hg19 Reference Genome

```bash
curl -O http://ftp.1000genomes.ebi.ac.uk/vol1/ftp/technical/reference/human_g1k_v37.fasta.fai
curl -O http://ftp.1000genomes.ebi.ac.uk/vol1/ftp/technical/reference/human_g1k_v37.fasta.gz
gunzip human_g1k_v37.fasta.gz
```

2. Filter out a single chromosome and index it using `samtools` - suite of tools for interacting w/ the file formats

`samtools faidx` filters out the single chromosome using the `.fai` index file.

[Bowtie2](https://github.com/BenLangmead/bowtie2) is a read aligner for aligning a sequence to a reference.
I think `minimap2` is an alternative, modern version.

```bash
samtools faidx human_g1k_v37.fasta 20 > human_g1k_v37_chr20.fasta
bowtie2-build human_g1k_v37_chr20.fasta homo_chr20
```

3. Simulate a read sample

[wgsim](https://github.com/lh3/wgsim) simulates sequence reads from a reference genome.
It simulates diloid genomes with SNPs and indel polymorphisms.

```bash
wgsim -N 1 human_g1k_v37_chr20.fasta single.read1.fq single.read2.fq > wgsim.out
```

4. Generate the sam

```bash
bowtie2 homo_chr20 -1 single.read1.fq -2 single.read2.fq -S single_pair.sam
```

5. Generate the bam

```bash
samtools view -b -S -o single_pair.bam single_pair.sam
```

6. Sort and index it

```bash
samtools sort single_pair.bam single_pair.sorted
samtools index single_pair.sorted.bam
```