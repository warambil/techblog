---
title: Should I Rust or should I go?
date: 2020-04-02
path: /should-i-rust-or-should-i-go
abstract: Rust has gained a lot of traction in the last years the question is what it should be used for
tags: ["rust","programming"]
author: Wilman Arambillete
---

Rust is a programming language that offers the performance of C and C++ but with safeguards to stop developers shooting themselves in the foot.

"The biggest strength of Rust is that it's an empowering technology," says Carol Nichols, from the Rust programming language core team and co-author of The Rust Programming Language book.

"To write extremely fast code with a low memory footprint previously meant using C or C++. However, using those languages in production code requires you to manage memory manually and know all the ways you might cause undefined behavior."

Nichols points out that the ever-expanding CVE database of code vulnerabilities is evidence that "even the best programmers" can struggle with this level of freedom.

"The Rust compiler is stricter and makes sure you're using memory safely so that you can concentrate on the problem you're really trying to solve," she says.

```rust
fn update_all_tags(config: &Config) -> RtResult<()> {
    let metadata = fetch_source_and_metadata(&config)?;
    update_std_lib_tags(&config)?;

    let mut source_locks = Vec::new();
    let dep_tree = {
        let mut dep_tree = dependency_tree(&config, &metadata)?;
        let unlocked_root_ids: Vec<_> = {
            let mut unlocked_roots = Vec::new();
            for source in dep_tree.roots() {
                match source.lock(&config.tags_spec)? {
                    SourceLock::AlreadyLocked { ref path } => {
                        info!(config, "Already creating tags for '{}', if this isn't the case remove the lock file '{}'",
                              source.name, path.display());
                        continue;
                    }

                    sl@SourceLock::Locked { .. } => {
                        source_locks.push(sl);
                        unlocked_roots.push(source);
                    }
                }
            }

            unlocked_roots.iter().map(|r| r.id).collect()
        };

        if unlocked_root_ids.is_empty() {
            return Ok(());
        }

        dep_tree.set_roots(unlocked_root_ids);
        dep_tree
    };

    update_tags(&config, &dep_tree)?;
    Ok(())
}
```

